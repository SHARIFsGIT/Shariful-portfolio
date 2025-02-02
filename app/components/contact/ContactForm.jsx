import { AlertCircle, Loader2, Send, X } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

const ContactForm = () => {
  const [showSuccess, setShowSuccess] = useState(false)

  const initialState = useMemo(
    () => ({
      name: '',
      email: '',
      subject: '',
      message: '',
    }),
    []
  )

  const [formData, setFormData] = useState(initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required'
      case 'email':
        if (!value.trim()) return 'Email is required'
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Please enter a valid email'
      case 'subject':
        return value.trim() ? '' : 'Subject is required'
      case 'message':
        return value.trim() ? '' : 'Message is required'
      default:
        return ''
    }
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = {}
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, validateField])

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))

      // Validate field on change for immediate feedback
      const error = validateField(name, value)
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }))
    },
    [validateField]
  )

  const handleCancel = useCallback(() => {
    setFormData(initialState)
    setErrors({})
    // Don't clear success message immediately on cancel
    if (submitStatus.type !== 'success') {
      setSubmitStatus({ type: '', message: '' })
    }
  }, [initialState, submitStatus.type])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()

      if (!validateForm()) {
        setSubmitStatus({
          type: 'error',
          message: 'Please fix the errors before submitting.',
        })
        return
      }

      setIsSubmitting(true)
      setSubmitStatus({ type: '', message: '' })

      try {
        const formDataToSend = new FormData()
        // Add form data
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value)
        })
        // Add access key
        formDataToSend.append(
          'access_key',
          '189002c5-d600-493e-aa7e-a97bf9f4d86f'
        )

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend,
        })

        const data = await response.json()

        if (data.success) {
          setSubmitStatus({
            type: 'success',
            message: 'Message sent successfully! Thank you for reaching out.',
          })
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 5000) // Hide after 5 seconds
          handleCancel()
        } else {
          throw new Error(data.message || 'Submission failed')
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        setSubmitStatus({
          type: 'error',
          message: 'Failed to send message. Please try again later.',
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData, validateForm, handleCancel]
  )

  const inputClasses =
    'w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-800 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:bg-gray-100'
  const labelClasses = 'mb-2 block font-medium text-gray-700 text-sm'
  const errorClasses = 'flex items-center gap-1 text-red-500 text-sm mt-1'

  return (
    <div className="relative mx-auto max-w-2xl">
      {/* Toast Notification */}
      {showSuccess && (
        <div className="animate-slide-in fixed right-4 top-4 z-50 transform transition-transform duration-500 ease-in-out">
          <div className="flex items-center space-x-3 rounded-lg bg-green-600 px-6 py-4 text-white shadow-lg">
            <div className="rounded-full bg-white p-1">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-bold">Message Sent Successfully!</h4>
              <p className="text-sm">
                {' '}
                We&apos;ll get back to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Alert */}
      {submitStatus.message && (
        <div
          className={`mb-6 flex items-start gap-4 rounded-lg p-6 ${
            submitStatus.type === 'success'
              ? 'animate-fade-in border-l-4 border-green-500 bg-green-50'
              : 'border-l-4 border-red-500 bg-red-50'
          }`}
        >
          <div className="flex-shrink-0">
            {submitStatus.type === 'success' ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <span className="text-2xl text-green-600">✓</span>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            )}
          </div>
          <div>
            <h3
              className={`mb-1 text-lg font-semibold ${
                submitStatus.type === 'success'
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}
            >
              {submitStatus.type === 'success'
                ? 'Message Sent Successfully!'
                : 'Error'}
            </h3>
            <p
              className={`text-sm ${
                submitStatus.type === 'success'
                  ? 'text-green-700'
                  : 'text-red-700'
              }`}
            >
              {submitStatus.message}
            </p>
            {submitStatus.type === 'success' && (
              <div className="mt-3 text-sm text-green-600">
                <ul className="list-inside list-disc space-y-1">
                  <li>You&apos;ll receive a confirmation email shortly</li>
                  <li>We typically respond within 24-48 hours</li>
                  <li>
                    Check your spam folder if you don&apos;t see our email
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className={errorClasses}>
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className={errorClasses}>
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
            disabled={isSubmitting}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && (
            <p id="subject-error" className={errorClasses}>
              <AlertCircle className="h-4 w-4" />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={8}
            className={inputClasses}
            disabled={isSubmitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className={errorClasses}>
              <AlertCircle className="h-4 w-4" />
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-gray-200 px-6 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
