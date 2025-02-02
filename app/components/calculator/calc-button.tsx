import { type ButtonHTMLAttributes } from 'react'

interface CalcButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  isHighlight?: boolean
  onPress?: () => void
  children?: React.ReactNode
}

export function CalcButton({
  label,
  isHighlight = false,
  onPress,
  children,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}: CalcButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onPress}
      className={`flex size-12 items-center justify-center rounded-full text-xl font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
        isHighlight
          ? 'bg-orange-400 text-white hover:bg-orange-500 active:bg-orange-600'
          : 'bg-black/10 text-black hover:bg-black/20 active:bg-black/30 dark:bg-white/20 dark:text-white dark:hover:bg-white/30 dark:active:bg-white/40'
      } ${className} `.trim()}
      aria-label={label}
      {...props}
    >
      {children ?? label}
    </button>
  )
}
