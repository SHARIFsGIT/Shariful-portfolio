import { useState } from 'react';
import Swal from 'sweetalert2';

const ContactForm = () => {
  const initialState = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const formDataToSend = new FormData(event.target);
    formDataToSend.append('access_key', '189002c5-d600-493e-aa7e-a97bf9f4d86f');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          title: 'Thank you!',
          text: 'Message sent successfully!',
          icon: 'success'
        });
        handleCancel();
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to send message. Please try again.',
        icon: 'error'
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialState);
    setErrors({});
  };

  const inputClasses = "w-full rounded border border-gray-700 bg-gradient-to-bl from-white via-gray-100 to-white p-3 text-gray-800 focus:border-gray-600 focus:outline-none";
  const errorClasses = "text-red-500 text-sm mt-1";

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
              className={inputClasses}
              disabled={isSubmitting}
            />
            {errors.name && <p className={errorClasses}>{errors.name}</p>}
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
              className={inputClasses}
              disabled={isSubmitting}
            />
            {errors.email && <p className={errorClasses}>{errors.email}</p>}
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
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.subject && <p className={errorClasses}>{errors.subject}</p>}
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
            className={inputClasses}
            disabled={isSubmitting}
          />
          {errors.message && <p className={errorClasses}>{errors.message}</p>}
        </div>

        <div className="flex justify-center gap-20">
          <button
            type="submit"
            disabled={isSubmitting}
            className="duration-800 rounded bg-green-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-600 hover:text-white disabled:opacity-50"
          >
            {isSubmitting ? 'SENDING...' : 'SUBMIT'}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="duration-800 rounded bg-red-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-600 hover:text-white disabled:opacity-50"
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;