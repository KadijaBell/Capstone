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
      className="space-y-8"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label htmlFor="name" className="text-ivory/90 font-medium block text-lg">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gold/20
            focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20
            text-ivory/90 placeholder-ivory/50 backdrop-blur-sm transition-all"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-ivory/90 font-medium block text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gold/20
            focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20
            text-ivory/90 placeholder-ivory/50 backdrop-blur-sm transition-all"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-ivory/90 font-medium block text-lg">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gold/20
          focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20
          text-ivory/90 placeholder-ivory/50 backdrop-blur-sm transition-all"
          placeholder="What's this about?"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-ivory/90 font-medium block text-lg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-6 py-4 rounded-xl bg-white/10 border border-gold/20
          focus:border-gold/50 focus:outline-none focus:ring-2 focus:ring-gold/20
          text-ivory/90 placeholder-ivory/50 backdrop-blur-sm transition-all resize-none"
          placeholder="Your message here..."
        />
      </div>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl backdrop-blur-sm border ${
            status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
            status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
            'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}
        >
          {status.message}
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status.type === 'loading'}
        className={`w-full py-4 px-8 rounded-xl bg-gold text-midnight font-semibold
        hover:bg-gold/90 transition-colors duration-300 shadow-elegant backdrop-blur-sm
        text-lg ${status.type === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {status.type === 'loading' ? 'Sending...' : 'Send Message'}
      </motion.button>
    </motion.form>
  );
}

export default ContactForm;
