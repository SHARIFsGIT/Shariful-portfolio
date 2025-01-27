import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function Alert({
  heading = 'Are you sure?',
  message = "This item will be deleted immediately. \n You can't undo this action",
  imageUrl,
  imageAlt = 'Alert image',
  onConfirm,
  onClose,
}: {
  onConfirm: () => void
  onClose: () => void
  imageUrl: string
  imageAlt?: string
  heading?: string
  message?: string
}) {
  // Ref for focus management
  const cancelButtonRef = useRef<HTMLButtonElement>(null)
  
  // Focus management
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement
    cancelButtonRef.current?.focus()
    
    return () => {
      previousActiveElement?.focus()
    }
  }, [])

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Trap focus within dialog
  useEffect(() => {
    const handleTab = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const dialog = document.querySelector('[role="alertdialog"]')
        const focusableElements = dialog?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [])

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-heading"
        aria-describedby="alert-message"
        className="fixed left-1/2 top-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-gray-600 bg-gray-800 p-8 text-gray-200 shadow-lg"
      >
        <Image
          alt={imageAlt}
          src={imageUrl}
          width={70}
          height={70}
          className="mb-4 h-auto w-auto"
          priority
        />
        <h2 id="alert-heading" className="text-3xl font-medium">
          {heading}
        </h2>
        <p 
          id="alert-message" 
          className="my-4 whitespace-pre-line text-center text-gray-300"
        >
          {message}
        </p>
        <div className="grid w-full grid-cols-2 gap-4">
          <button
            ref={cancelButtonRef}
            onClick={onClose}
            className="w-full rounded bg-gray-600 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded bg-blue-600 px-4 py-2 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  )
}

export default Alert