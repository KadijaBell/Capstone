import { useState } from "react";
import { motion } from "framer-motion";
import { fetchAPI } from '../../utils/api';

function ContactForm() {
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetchAPI("/api/admin/contact-submissions", {
        method: "POST",
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      setStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
        console.error("Error submitting form:", error);
        setStatus({
          type: 'error',
          message: 'Failed to send message. Please try again.'
        });
      }
    };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-midnight mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-midnight mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-midnight mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-midnight mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>
      {status.message && (
        <div className={`p-4 rounded-lg ${
          status.type === 'success' ? 'bg-green-100 text-green-700' :
          status.type === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {status.message}
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full bg-gold text-midnight py-3 rounded-lg font-semibold
          hover:bg-ivory transition duration-300
          ${status.type === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
}

export default ContactForm;
