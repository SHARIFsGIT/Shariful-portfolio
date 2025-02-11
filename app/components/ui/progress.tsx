interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className = '' }: ProgressProps) {
  return (
    <div
      className={`bg-secondary h-2 w-full overflow-hidden rounded-full ${className}`}
    >
      <div
        className="h-full bg-primary transition-all duration-200"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}
