import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useState } from 'react';

function MessageThreadModal({ isOpen, onClose, message, threadMessages, onReply }) {
    const [replyContent, setReplyContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const formatMessageTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return format(date, 'h:mm a');
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return format(date, 'MMM d, yyyy');
        }
    };

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyContent.trim()) return;

        setIsLoading(true);
        onReply(message.id, replyContent);

        setTimeout(() => {
            setReplyContent('');
            setIsLoading(false);
        }, 500);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Message Thread</h2>
                            <p className="text-sm text-gray-600">
                                {message.is_admin_message ? (
                                    `To: ${message.recipient_name || message.sender_name || 'User'}`
                                ) : (
                                    'To: Admin'
                                )}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    </div>

                    {/* Thread Content */}
                    <div className="p-4 overflow-y-auto flex-grow">
                        <div className="space-y-4">
                            {/* Original Message */}
                            <div className="bg-gold/5 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">
                                            {message.is_admin_message ? 'Admin' : (message.sender_name || 'User')}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {message.event_id
                                                ? `Event: ${message.event_title}`
                                                : message.is_admin_message
                                                    ? `To: ${message.recipient_name || message.sender_name || 'User'}`
                                                    : 'To: Admin'}
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {formatMessageTime(message.created_at)}
                                    </span>
                                </div>
                                <p className="text-gray-800">{message.content}</p>
                            </div>

                            {/* Thread Messages */}
                            {threadMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-4 rounded-lg ${
                                        msg.is_admin_message ? 'bg-blue-50 ml-4' : 'bg-gray-50'
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-medium">
                                            {msg.is_admin_message ? 'Admin' : (msg.sender_name || 'User')}
                                        </p>
                                        <span className="text-sm text-gray-500">
                                            {formatMessageTime(msg.created_at)}
                                        </span>
                                    </div>
                                    <p className="text-gray-800">{msg.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reply Form */}
                    <div className="border-t p-4 bg-white">
                        <form onSubmit={handleReply} className="space-y-3">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold/50 resize-none"
                                rows="3"
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!replyContent.trim()}
                                    className={`bg-gold text-white px-6 py-2 rounded-lg hover:bg-gold/90 transition-colors font-medium
                                        ${isLoading ? 'opacity-50 cursor-wait' : 'disabled:opacity-50'}`}
                                >
                                    {isLoading ? 'Sending...' : 'Send Reply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default MessageThreadModal;
