import { runPrompt } from '@/app/features/terminal'
import { commandsHelp } from '@/app/features/terminal/terminal-commands'
import { closeFolder, openFolder } from '@/app/features/window-slice'
import { useDispatch, useSelector } from '@/app/store'
import { IconBrandVscode, IconTerminal2 } from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

interface Theme {
  background: string
  text: string
  prompt: string
  error: string
  accent: string
  muted: string
  border: string
}

const themes: Record<string, Theme> = {
  dark: {
    background: 'bg-zinc-950',
    text: 'text-zinc-100',
    prompt: 'text-emerald-400',
    error: 'text-red-400',
    accent: 'text-emerald-500',
    muted: 'text-zinc-500',
    border: 'border-zinc-800',
  },
  light: {
    background: 'bg-zinc-50',
    text: 'text-zinc-900',
    prompt: 'text-emerald-600',
    error: 'text-red-600',
    accent: 'text-emerald-700',
    muted: 'text-zinc-500',
    border: 'border-zinc-200',
  },
  matrix: {
    background: 'bg-black',
    text: 'text-green-500',
    prompt: 'text-green-400',
    error: 'text-red-500',
    accent: 'text-green-300',
    muted: 'text-green-800',
    border: 'border-green-900',
  },
}

export function Terminal() {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const [prompt, setPrompt] = useState('')
  const [nodePrompt, setNodePrompt] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeTab, setActiveTab] = useState<'terminal' | 'node'>('terminal')

  const terminal = useSelector((state) => state.terminal)
  const folders = useSelector((state) => state.windowFrame)

  const [customization, setCustomization] = useState({
    promptSymbol: '➜',
    fontSize: 14,
    fontFamily: 'JetBrains Mono, monospace',
    theme: themes.dark,
  })

  const focusInput = useCallback(() => {
    if (activeTab === 'terminal' && inputRef.current) {
      inputRef.current.focus()
    } else if (activeTab === 'node' && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [activeTab])

  useEffect(() => {
    focusInput()
    scrollToBottom()
  }, [terminal.mode, focusInput])

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }

  const handleCommandExecution = async (command: string) => {
    if (!command.trim()) return

    if (command.startsWith('cat ')) {
      const directory = command.split(' ')[1]
      if (directory) {
        const isFound = folders.find(({ id }) => id === directory.toLowerCase())
        if (isFound) {
          dispatch(openFolder(isFound.id))
          if (isFound.status === 'minimize' && isFound.onMinimizeRestore) {
            isFound.onMinimizeRestore()
          }
        }
      }
    } else if (command === 'clear') {
      dispatch(runPrompt('clear'))
    } else if (command === 'exit') {
      dispatch(closeFolder('terminal'))
    } else if (command.startsWith('theme ')) {
      const newTheme = command.split(' ')[1]
      handleThemeChange(newTheme)
    } else {
      dispatch(runPrompt(command))
    }
  }

  const handleThemeChange = (theme: string) => {
    setCustomization((prev) => ({
      ...prev,
      theme: themes[theme as keyof typeof themes] || themes.dark,
    }))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      handleTabCompletion()
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      handleCtrlC()
    }
  }

  const handleTabCompletion = () => {
    const currentCommand = prompt.trim()
    if (!currentCommand) return

    const availableCommands = [
      ...commandsHelp.map((cmd) => cmd.command),
      ...folders.map((folder) => `cat ${folder.name.toLowerCase()}`),
      'clear',
      'exit',
      'theme dark',
      'theme light',
      'theme matrix',
    ]

    const matches = availableCommands.filter(
      (cmd) => cmd.startsWith(currentCommand) && cmd !== currentCommand
    )

    if (matches.length === 1) {
      setPrompt(matches[0])
      setSuggestions([])
      setShowSuggestions(false)
    } else if (matches.length > 1) {
      setSuggestions(matches)
      setShowSuggestions(true)
    }
  }

  const handleCtrlC = () => {
    setPrompt('')
    setNodePrompt('')
    dispatch(runPrompt(''))
    focusInput()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCommandExecution(prompt)
    setPrompt('')
    setShowSuggestions(false)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-zinc-800 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 pl-4">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm ${
                activeTab === 'terminal'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <IconTerminal2 size={16} />
              Terminal
            </button>
            <button
              onClick={() => setActiveTab('node')}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm ${
                activeTab === 'node'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <IconBrandVscode size={16} />
              Node.js
            </button>
          </div>
        </div>
      </div>

      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-4 font-mono text-sm"
        style={{ fontFamily: customization.fontFamily }}
        onClick={focusInput}
      >
        <AnimatePresence>
          {terminal.history.map((command) => (
            <motion.div
              key={command.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <div className="flex items-start gap-2">
                <span
                  className={`flex items-center gap-1 ${customization.theme.prompt}`}
                >
                  {customization.promptSymbol}
                </span>
                <div className="flex-1">
                  <p className={`font-mono ${customization.theme.text}`}>
                    {command.command}
                  </p>
                  {command.error && (
                    <p className={`mt-2 ${customization.theme.error}`}>
                      {command.error}
                    </p>
                  )}
                  {command.console && (
                    <div className={`mt-2 ${customization.theme.text}`}>
                      {command.console.split('\n').map((line, i) => (
                        <p key={i} className="leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                  {command.command === 'pwd' && (
                    <p className={`mt-2 ${customization.theme.accent}`}>
                      /desktop
                    </p>
                  )}
                  {command.command === 'ls' && (
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {folders.map((folder) => (
                        <div
                          key={folder.id}
                          className={`rounded-md border ${customization.theme.border} p-2`}
                        >
                          <p className={customization.theme.text}>
                            {folder.type === 'folder' && `/${folder.name}`}
                            {folder.type === 'pdf' && `${folder.name}.pdf`}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {command.command === 'help' && (
                    <div className="mt-2 space-y-2">
                      {commandsHelp.map((item) => (
                        <div
                          key={item.command}
                          className={`rounded-md border ${customization.theme.border} p-2`}
                        >
                          <p
                            className={`font-bold ${customization.theme.accent}`}
                          >
                            {item.command}
                          </p>
                          <p className={`mt-1 ${customization.theme.text}`}>
                            {item.action}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-start gap-2">
          <span
            className={`flex items-center gap-1 ${customization.theme.prompt}`}
          >
            {customization.promptSymbol}
          </span>
          {activeTab === 'terminal' ? (
            <form onSubmit={handleSubmit} className="flex-1">
              <input
                ref={inputRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-full resize-none bg-transparent outline-none ${customization.theme.text}`}
                spellCheck={false}
                autoComplete="off"
                placeholder="Type a command..."
              />
            </form>
          ) : (
            <form className="flex-1">
              <textarea
                ref={textareaRef}
                value={nodePrompt}
                onChange={(e) => setNodePrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    const command = nodePrompt.trim()
                    if (command) {
                      dispatch(runPrompt(command))
                      setNodePrompt('')
                    }
                  }
                }}
                rows={5}
                className={`w-full resize-none bg-transparent outline-none ${customization.theme.text}`}
                spellCheck={false}
                placeholder="Write your Node.js code here..."
              />
            </form>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`m-4 overflow-hidden rounded-lg border ${customization.theme.border}`}
          >
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`cursor-pointer p-2 transition-colors hover:bg-zinc-800 ${customization.theme.text}`}
                onClick={() => {
                  setPrompt(suggestion)
                  setShowSuggestions(false)
                  focusInput()
                }}
              >
                {suggestion}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
