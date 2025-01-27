import { useState } from 'react'
import Swal from 'sweetalert2'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    formData.append('access_key', '189002c5-d600-493e-aa7e-a97bf9f4d86f')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        Swal.fire({
          title: 'Thank you!',
          text: 'Message sent successfully!',
          icon: 'success',
        })
        event.target.reset()
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        console.log('Error', data)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    })
  }

  return (
    <div className="mx-auto max-w-2xl text-gray-800">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block font-mono text-sm">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded border border-gray-700 bg-gradient-to-br from-white via-gray-100 to-white p-3 text-gray-800 focus:border-gray-600 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-sm">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border border-gray-700 bg-gradient-to-bl from-white via-gray-100 to-white p-3 text-gray-800 focus:border-gray-600 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="mb-2 block font-mono text-sm">
            SUBJECT
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full rounded border border-gray-700 bg-gradient-to-bl from-white via-gray-100 to-white p-3 text-gray-800 focus:border-gray-600 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-mono text-sm">
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={19}
            className="w-full rounded border border-gray-700 bg-gradient-to-bl from-white via-gray-100 to-white p-3 text-gray-800 focus:border-gray-600 focus:outline-none"
            required
          />
        </div>

        <div className="flex justify-center gap-20">
          <button
            type="submit"
            className="duration-800 rounded bg-green-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-500 hover:text-gray-900"
          >
            SUBMIT
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="duration-800 rounded bg-red-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-500 hover:text-gray-900"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm
