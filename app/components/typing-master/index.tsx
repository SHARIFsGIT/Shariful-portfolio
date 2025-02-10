import {
  AlertCircle,
  Clock,
  History,
  Keyboard,
  RefreshCw,
  Trophy,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const TIMER_OPTIONS = [30, 60, 120]

const TEXTS = [
  'The quick brown fox jumps over the lazy dog and runs through the meadow.',
  'In programming, attention to detail is crucial for writing clean and efficient code.',
  'The best way to predict the future is to create it through consistent practice.',
  'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  'Technology is best when it brings people together and enhances human interaction.',
]

interface Stats {
  wpm: number
  accuracy: number
  errors: number
  totalChars: number
  correctChars: number
}

export default function TypingMaster() {
  const [currentText, setCurrentText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [timer, setTimer] = useState(60)
  const [selectedTime, setSelectedTime] = useState(60)
  const [status, setStatus] = useState('idle')
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    accuracy: 100,
    errors: 0,
    totalChars: 0,
    correctChars: 0,
  })
  const [history, setHistory] = useState<Stats[]>([])

  const getNewText = useCallback(() => {
    return TEXTS[Math.floor(Math.random() * TEXTS.length)]
  }, [])

  const resetGame = useCallback(() => {
    setCurrentText(getNewText())
    setUserInput('')
    setTimer(selectedTime)
    setStatus('idle')
    setStats({
      wpm: 0,
      accuracy: 100,
      errors: 0,
      totalChars: 0,
      correctChars: 0,
    })
    inputRef.current?.focus()
  }, [selectedTime, getNewText])

  useEffect(() => {
    setCurrentText(getNewText())
  }, [getNewText])

  const calculateStats = useCallback(() => {
    const correctChars = userInput
      .split('')
      .filter((char, i) => char === currentText[i]).length
    const errors = userInput.length - correctChars
    const accuracy = Math.round((correctChars / userInput.length) * 100) || 100
    const minutes = (selectedTime - timer) / 60
    const wpm = Math.round(userInput.length / 5 / minutes) || 0

    setStats({
      wpm,
      accuracy,
      errors,
      totalChars: userInput.length,
      correctChars,
    })
  }, [userInput, currentText, timer, selectedTime])

  useEffect(() => {
    if (status !== 'typing') return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setStatus('finished')
          setHistory((prev) => [...prev, stats])
          return 0
        }
        return prev - 1
      })
      calculateStats()
    }, 1000)

    return () => clearInterval(interval)
  }, [status, calculateStats, stats])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    setUserInput(input)

    if (status === 'idle') {
      setStatus('typing')
    }

    if (input.length === currentText.length) {
      setCurrentText(getNewText())
      setUserInput('')
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-wrap gap-3">
          {TIMER_OPTIONS.map((time) => (
            <button
              key={time}
              onClick={() => {
                setSelectedTime(time)
                setTimer(time)
                resetGame()
              }}
              className={`flex items-center gap-2 rounded-full px-6 py-2.5 font-medium transition-all hover:scale-105 ${
                selectedTime === time
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              <Clock className="h-4 w-4" />
              {time}s
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 font-medium text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-600"
          >
            <RefreshCw className="h-4 w-4" />
            Restart
          </button>
          <div className="flex items-center gap-2 rounded-full bg-gray-100 px-6 py-2.5 font-medium dark:bg-gray-800">
            <Clock className="h-4 w-4 text-blue-500" />
            {timer}s
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { icon: Keyboard, label: 'WPM', value: stats.wpm },
          { icon: AlertCircle, label: 'Accuracy', value: `${stats.accuracy}%` },
          { icon: RefreshCw, label: 'Errors', value: stats.errors },
          { icon: History, label: 'Characters', value: stats.totalChars },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-lg transition-all hover:scale-105 dark:bg-gray-800"
          >
            <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
              <Icon className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {label}
              </div>
              <div className="text-2xl font-bold">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {status === 'idle' && (
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              Start typing to begin the test. The timer will start
              automatically.
            </div>
          </div>
        )}

        <div className="rounded-xl bg-white p-6 font-mono text-xl leading-relaxed shadow-lg transition-all dark:bg-gray-800">
          {currentText.split('').map((char, i) => {
            const userChar = userInput[i]
            let className = 'transition-colors duration-200'

            if (userChar != null) {
              className +=
                userChar === char
                  ? ' text-green-500 dark:text-green-400'
                  : ' text-red-500 dark:text-red-400'
            }

            return (
              <span key={i} className={className}>
                {char}
              </span>
            )
          })}
        </div>

        <input
          ref={inputRef}
          value={userInput}
          onChange={handleInput}
          disabled={status === 'finished'}
          className="w-full rounded-xl bg-white p-4 font-mono text-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:focus:ring-blue-400"
          placeholder={
            status === 'finished' ? 'Test complete!' : 'Start typing...'
          }
          autoFocus
        />
      </div>

      {status === 'finished' && (
        <div className="results rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-300" />
            <h2 className="text-2xl font-bold">Final Results</h2>
          </div>
          <div className="grid grid-cols-2 gap-6 text-lg">
            <div className="rounded-lg bg-white/10 p-4">
              WPM: <span className="font-bold">{stats.wpm}</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              Accuracy: <span className="font-bold">{stats.accuracy}%</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              Total Characters:{' '}
              <span className="font-bold">{stats.totalChars}</span>
            </div>
            <div className="rounded-lg bg-white/10 p-4">
              Correct Characters:{' '}
              <span className="font-bold">{stats.correctChars}</span>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-8 rounded-xl bg-white p-6 shadow-xl dark:bg-gray-800">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-bold">Previous Attempts</h2>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-blue-500 hover:text-blue-600"
            >
              {showHistory ? 'Hide' : 'Show'}
            </button>
          </div>
          {showHistory && (
            <div className="space-y-4">
              {history.map((attempt, index) => (
                <div
                  key={index}
                  className="hover:scale-102 grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 shadow-md transition-all md:grid-cols-4 dark:bg-gray-700"
                >
                  <div>
                    WPM: <span className="font-medium">{attempt.wpm}</span>
                  </div>
                  <div>
                    Accuracy:{' '}
                    <span className="font-medium">{attempt.accuracy}%</span>
                  </div>
                  <div>
                    Errors:{' '}
                    <span className="font-medium">{attempt.errors}</span>
                  </div>
                  <div>
                    Characters:{' '}
                    <span className="font-medium">{attempt.totalChars}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
