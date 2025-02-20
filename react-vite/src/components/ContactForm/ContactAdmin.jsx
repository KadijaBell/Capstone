import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactAdmin = ({ onClose }) => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Sending message...' });

        try {
            const response = await fetch('/api/users/contact-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus({
                type: 'success',
                message: 'Message sent successfully!'
            });
            setMessage('');
            setTimeout(() => {
                onClose();
            }, 1500);

        } catch (error) {
            console.error('Error:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.'
            });
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-midnight">Contact Administration</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                >
                    ×
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    rows={6}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold resize-none"
                />

                {status.message && (
                    <div className={`p-3 rounded-lg text-sm ${
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
                    className="w-full bg-gold text-midnight py-3 rounded-lg font-semibold
                        hover:bg-gold/80 transition duration-300 disabled:opacity-50"
                >
                    {status.type === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
            </form>
        </div>
    );
};

export default ContactAdmin;
