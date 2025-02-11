import { IconChartBar, IconClock, IconRefresh } from '@tabler/icons-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import {
  getCategoryIcon,
  getDifficultyColor,
  TypingText,
  typingTexts,
} from './typing-texts'

interface TypingStats {
  wpm: number
  accuracy: number
  errors: number
  streak: number
  bestWPM: number
  totalChars: number
  correctChars: number
}

interface HistoryEntry {
  date: Date
  wpm: number
  accuracy: number
  text: string
  category: string
  difficulty: string
}

const TIMER_OPTIONS = [30, 60, 120, 300]

// Create audio elements
const keySound =
  typeof Audio !== 'undefined' ? new Audio('/key-press.mp3') : null
const errorSound = typeof Audio !== 'undefined' ? new Audio('/error.mp3') : null

if (keySound) keySound.volume = 0.2
if (errorSound) errorSound.volume = 0.15

export function TypingMaster() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState<
    TypingText['category'] | 'all'
  >('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    TypingText['difficulty'] | 'all'
  >('all')
  const [typing, setTyping] = useState('')
  const [timerDuration, setTimerDuration] = useState(60)
  const [timer, setTimer] = useState(timerDuration)
  const [status, setStatus] = useState<'typing' | 'idle' | 'finished'>('idle')
  const [caretPosition, setCaretPosition] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showStats, setShowStats] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const lastErrorTime = useRef(0)

  // Statistics state
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    streak: 0,
    bestWPM: 0,
    totalChars: 0,
    correctChars: 0,
  })

  const [history, setHistory] = useState<HistoryEntry[]>([])

  // Filter available texts
  const filteredTexts = useMemo(() => {
    return typingTexts.filter(
      (text) =>
        (selectedCategory === 'all' || text.category === selectedCategory) &&
        (selectedDifficulty === 'all' || text.difficulty === selectedDifficulty)
    )
  }, [selectedCategory, selectedDifficulty])

  // Current text management
  const [currentText, setCurrentText] = useState(() => {
    const random = Math.floor(Math.random() * filteredTexts.length)
    return filteredTexts[random]
  })

  // Independent timer effect
  useEffect(() => {
    if (status === 'idle' || status === 'finished') return

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(intervalId)
          setStatus('finished')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [status])

  // WPM calculation effect
  useEffect(() => {
    if (status !== 'typing') return

    const intervalId = setInterval(() => {
      const timeElapsed = (timerDuration - timer) / 60
      if (timeElapsed > 0) {
        const wordsTyped = stats.correctChars / 5
        const currentWPM = Math.round(wordsTyped / timeElapsed)
        setStats((prev) => ({
          ...prev,
          wpm: currentWPM,
          bestWPM: Math.max(prev.bestWPM, currentWPM),
        }))
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer, status, stats.correctChars, timerDuration])

  // Reset game
  const resetGame = useCallback(() => {
    const random = Math.floor(Math.random() * filteredTexts.length)
    setCurrentText(filteredTexts[random])
    setTyping('')
    setTimer(timerDuration)
    setStatus('idle')
    setCaretPosition(0)
    setStats((prev) => ({
      ...prev,
      wpm: 0,
      accuracy: 100,
      errors: 0,
      streak: 0,
      totalChars: 0,
      correctChars: 0,
    }))
  }, [filteredTexts, timerDuration])

  // Handle text completion
  const handleTextCompletion = useCallback(() => {
    const random = Math.floor(Math.random() * filteredTexts.length)
    setCurrentText(filteredTexts[random])
    setTyping('')
    setCaretPosition(0)
    setStats((prev) => ({
      ...prev,
      streak: prev.streak + 1,
    }))
  }, [filteredTexts])

  // Handle typing with sound effects
  const handleTyping = useCallback(
    (input: string) => {
      if (status === 'idle') {
        setStatus('typing')
      }

      setTyping(input)
      setCaretPosition(input.length)

      // Sound effects and error handling
      const lastChar = input[input.length - 1]
      const expectedChar = currentText.text[input.length - 1]

      if (soundEnabled) {
        if (lastChar !== expectedChar) {
          if (errorSound) {
            errorSound.currentTime = 0
            errorSound.play()
          }

          // Add error shake animation
          if (inputRef.current && Date.now() - lastErrorTime.current > 100) {
            inputRef.current.classList.add('shake')
            setTimeout(() => {
              inputRef.current?.classList.remove('shake')
            }, 500)
            lastErrorTime.current = Date.now()
          }
        } else if (keySound) {
          keySound.currentTime = 0
          keySound.play()
        }
      }

      // Update statistics
      let correctChars = 0
      let errors = 0

      for (let i = 0; i < input.length; i++) {
        if (input[i] === currentText.text[i]) {
          correctChars++
        } else {
          errors++
        }
      }

      setStats((prev) => ({
        ...prev,
        errors,
        totalChars: input.length,
        correctChars,
        accuracy: input.length
          ? Math.round((correctChars / input.length) * 100)
          : 100,
      }))

      if (input === currentText.text) {
        handleTextCompletion()
      }
    },
    [currentText.text, status, soundEnabled, handleTextCompletion]
  )

  // Reset game when timer duration changes
  useEffect(() => {
    resetGame()
  }, [timerDuration, resetGame])

  // Styles for cursor and animations
  const customStyles = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .shake {
      animation: shake 0.2s ease-in-out;
    }
  `

  return (
    <div className="max-h-full overflow-y-auto p-4">
      <style>{customStyles}</style>

      <div className="flex flex-col items-center gap-6">
        {/* Stats Bar */}
        <div className="w-full rounded-lg bg-light-foreground p-4 shadow-md dark:bg-dark-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">WPM</p>
                <p className="text-2xl font-bold">{stats.wpm}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="text-2xl font-bold">{stats.accuracy}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Best WPM</p>
                <p className="text-2xl font-bold">{stats.bestWPM}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-2xl font-bold">🔥 {stats.streak}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <select
                  value={timerDuration}
                  onChange={(e) => setTimerDuration(Number(e.target.value))}
                  className="rounded bg-white px-2 py-1 text-sm dark:bg-black"
                >
                  {TIMER_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}s
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1 rounded bg-white px-3 py-1 font-medium dark:bg-black">
                  <IconClock className="size-4" />
                  {timer}s
                </div>
              </div>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`rounded px-3 py-1 ${
                  soundEnabled
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-800'
                }`}
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>

              <button
                onClick={resetGame}
                className="flex items-center gap-2 rounded bg-primary px-3 py-1 font-medium text-dark-text hover:bg-primary/90"
              >
                <IconRefresh className="size-4" />
                Restart
              </button>

              <button
                onClick={() => setShowStats(!showStats)}
                className="flex items-center gap-2 rounded bg-gray-200 px-3 py-1 font-medium dark:bg-gray-800"
              >
                <IconChartBar className="size-4" />
                Stats
              </button>
            </div>
          </div>
        </div>

        {/* Category and Difficulty Filters */}
        <div className="flex w-full flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value as TypingText['category'] | 'all'
              )
            }
            className="rounded bg-light-foreground px-4 py-2 dark:bg-dark-foreground"
          >
            <option value="all">All Categories</option>
            <option value="humor">Humor</option>
            <option value="tech">Tech</option>
            <option value="quotes">Quotes</option>
            <option value="programming">Programming</option>
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) =>
              setSelectedDifficulty(
                e.target.value as TypingText['difficulty'] | 'all'
              )
            }
            className="rounded bg-light-foreground px-4 py-2 dark:bg-dark-foreground"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Text Display */}
        <div className="relative w-full max-w-4xl rounded-lg bg-light-foreground p-6 shadow-md dark:bg-dark-foreground">
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <Badge
              variant="secondary"
              className={getDifficultyColor(currentText.difficulty)}
            >
              {currentText.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="outline">
              {getCategoryIcon(currentText.category)} {currentText.category}
            </Badge>
          </div>

          <div className="mt-6 text-3xl font-medium leading-relaxed tracking-wide">
            {currentText.text.split('').map((char, i) => {
              const isCurrent = i === caretPosition
              const isTyped = typing[i] !== undefined

              let className = 'relative transition-colors duration-150 '
              if (!isTyped) {
                className += 'text-gray-400 '
              } else if (typing[i] === char) {
                className += 'text-green-400 '
              } else {
                className += 'text-red-400 '
              }

              return (
                <span key={i} className={className}>
                  {char}
                  {isCurrent && (
                    <span
                      className="absolute bottom-0 left-0 top-0"
                      style={{
                        transform: `translateX(${char === ' ' ? '0.5em' : '1em'})`,
                      }}
                    />
                  )}
                </span>
              )
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <Progress
          value={(typing.length / currentText.text.length) * 100}
          className="w-full max-w-4xl"
        />

        {/* Input Field */}
        <input
          ref={inputRef}
          disabled={timer === 0}
          value={typing}
          onChange={(e) => handleTyping(e.target.value)}
          className="w-full max-w-4xl rounded-lg bg-light-foreground px-6 py-4 text-2xl font-medium shadow-md transition-transform focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-foreground"
          placeholder={status === 'idle' ? 'Type to start...' : ''}
          autoFocus
        />

        {/* Stats Modal */}
        {showStats && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Typing History</h2>
                <button
                  onClick={() => setShowStats(false)}
                  className="rounded bg-gray-200 px-3 py-1 dark:bg-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-center text-gray-500">
                    No typing history yet. Complete a test to see your results!
                  </p>
                ) : (
                  history
                    .slice()
                    .reverse()
                    .map((entry, i) => (
                      <div
                        key={i}
                        className="rounded-lg border p-4 dark:border-gray-700"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {entry.date.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {entry.difficulty.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {getCategoryIcon(
                                entry.category as TypingText['category']
                              )}{' '}
                              {entry.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="mb-2 flex justify-between text-lg font-medium">
                          <span>{entry.wpm} WPM</span>
                          <span>{entry.accuracy}% Accuracy</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {entry.text}
                        </p>
                      </div>
                    ))
                )}
              </div>

              {/* Stats Summary */}
              {history.length > 0 && (
                <div className="mt-6 rounded-lg border p-4 dark:border-gray-700">
                  <h3 className="mb-4 text-lg font-bold">Summary Statistics</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <p className="text-sm text-gray-500">Average WPM</p>
                      <p className="text-xl font-bold">
                        {Math.round(
                          history.reduce((acc, entry) => acc + entry.wpm, 0) /
                            history.length
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Best WPM</p>
                      <p className="text-xl font-bold">
                        {Math.max(...history.map((entry) => entry.wpm))}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Average Accuracy</p>
                      <p className="text-xl font-bold">
                        {Math.round(
                          history.reduce(
                            (acc, entry) => acc + entry.accuracy,
                            0
                          ) / history.length
                        )}
                        %
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tests Completed</p>
                      <p className="text-xl font-bold">{history.length}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Export/Clear Buttons */}
              {history.length > 0 && (
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      const data = JSON.stringify(history, null, 2)
                      const blob = new Blob([data], {
                        type: 'application/json',
                      })
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'typing-history.json'
                      document.body.appendChild(a)
                      a.click()
                      document.body.removeChild(a)
                      URL.revokeObjectURL(url)
                    }}
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                  >
                    Export History
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to clear your typing history?'
                        )
                      ) {
                        setHistory([])
                      }
                    }}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
                    Clear History
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Finished Test Modal */}
        {status === 'finished' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
              <h2 className="mb-4 text-2xl font-bold">Test Complete!</h2>
              <div className="mb-6 space-y-4">
                <div className="flex justify-between">
                  <span>WPM:</span>
                  <span className="font-bold">{stats.wpm}</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy:</span>
                  <span className="font-bold">{stats.accuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Characters:</span>
                  <span className="font-bold">{stats.totalChars}</span>
                </div>
                <div className="flex justify-between">
                  <span>Errors:</span>
                  <span className="font-bold">{stats.errors}</span>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={resetGame}
                  className="rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setShowStats(true)}
                  className="rounded bg-gray-200 px-4 py-2 dark:bg-gray-700"
                >
                  View History
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
