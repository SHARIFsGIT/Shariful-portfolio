import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

interface AlertProps {
  /**
   * The main heading of the alert dialog
   */
  heading?: string
  /**
   * The detailed message shown in the alert dialog
   * Supports line breaks with \n
   */
  message?: string
  /**
   * URL for the alert image
   */
  imageUrl: string
  /**
   * Alt text for the alert image
   */
  imageAlt?: string
  /**
   * Callback fired when user confirms the action
   * Can be async to support loading states
   */
  onConfirm: () => void | Promise<void>
  /**
   * Callback fired when dialog is closed
   */
  onClose: () => void
  /**
   * Custom text for confirm button
   */
  confirmText?: string
  /**
   * Custom text for cancel button
   */
  cancelText?: string
  /**
   * Whether the alert is in a destructive context
   */
  isDestructive?: boolean
  /**
   * Custom size for the alert image
   */
  imageSize?: number
  /**
   * Whether to disable the animation
   */
  disableAnimation?: boolean
  /**
   * Custom CSS class for the dialog
   */
  className?: string
  /**
   * Time in ms before auto-closing (optional)
   */
  autoCloseAfter?: number
  /**
   * Whether to show a countdown timer for auto-close
   */
  showCountdown?: boolean
}

export function Alert({
  heading = 'Are you sure?',
  message = "This item will be deleted immediately. \nYou can't undo this action",
  imageUrl,
  imageAlt = 'Alert image',
  onConfirm,
  onClose,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  imageSize = 70,
  disableAnimation = false,
  className = '',
  autoCloseAfter,
  showCountdown = false,
}: AlertProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(autoCloseAfter || 0)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Define handleConfirm before it's used in useEffect
  const handleConfirm = useCallback(async () => {
    try {
      setIsLoading(true)
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Error during confirmation:', error)
    } finally {
      setIsLoading(false)
    }
  }, [onConfirm, onClose])

  // Handle auto-close countdown
  useEffect(() => {
    if (!autoCloseAfter) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(timer)
          onClose()
          return 0
        }
        return prev - 1000
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [autoCloseAfter, onClose])

  // Focus management
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement
    cancelButtonRef.current?.focus()

    return () => {
      previousActiveElement?.focus()
    }
  }, [])

  // Handle keyboard interactions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLoading) return

      // Close on ESC
      if (event.key === 'Escape') {
        onClose()
      }

      // Confirm on Ctrl+Enter
      if (event.key === 'Enter' && event.ctrlKey) {
        handleConfirm()
      }

      // Focus trap
      if (event.key === 'Tab') {
        const dialog = dialogRef.current
        const focusableElements = dialog?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )

        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement

          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, isLoading, handleConfirm])

  return (
    <>
      {/* Overlay with click outside to close */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-heading"
        aria-describedby="alert-message"
        className={`fixed left-1/2 top-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-gray-600 bg-gray-800 p-8 text-gray-200 shadow-lg ${className}`}
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image
              alt={imageAlt}
              src={imageUrl}
              width={imageSize}
              height={imageSize}
              className={`mb-4 h-auto w-auto ${
                !disableAnimation ? 'animate-bounce-once' : ''
              }`}
              priority
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
          </div>

          <h2 id="alert-heading" className="text-3xl font-medium">
            {heading}
          </h2>
          <p
            id="alert-message"
            className="my-4 whitespace-pre-line text-center text-gray-300"
          >
            {message}
            {showCountdown && autoCloseAfter && timeLeft > 0 && (
              <span className="mt-2 block text-sm text-gray-400">
                Closing in {Math.ceil(timeLeft / 1000)}s
              </span>
            )}
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-4">
          <button
            ref={cancelButtonRef}
            onClick={!isLoading ? onClose : undefined}
            disabled={isLoading}
            className="w-full rounded bg-gray-600 px-4 py-2 text-base font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 hover:enabled:bg-gray-700 active:enabled:scale-95 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full rounded px-4 py-2 text-base font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 active:enabled:scale-95 disabled:opacity-50 ${
              isDestructive
                ? 'bg-red-600 hover:enabled:bg-red-700'
                : 'bg-blue-600 hover:enabled:bg-blue-700'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default Alert
