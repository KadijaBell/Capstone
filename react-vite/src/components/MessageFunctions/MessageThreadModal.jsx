import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useState } from 'react';

function MessageThreadModal({ isOpen, onClose, message, threadMessages, onReply }) {
    const [replyContent, setReplyContent] = useState('');

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
        onReply(message.id, replyContent);
        setReplyContent('');
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-xl"
                >
                    {/* Header */}
                    <div className="p-4 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Message Thread</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    {/* Thread Content */}
                    <div className="p-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
                        <div className="space-y-4">
                            {/* Original Message */}
                            <div className="bg-gold/5 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-medium">
                                            {message.is_admin_message ? 'Admin' : message.sender_name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {message.event_id
                                                ? `Event: ${message.event_title}`
                                                : `To: ${message.recipient_name}`}
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
                                            {msg.is_admin_message ? 'Admin' : msg.sender_name}
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

                    <div className="mt-4 border-t pt-4">
                        <form onSubmit={handleReply} className="space-y-3">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Write your reply..."
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold/50"
                                rows="3"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!replyContent.trim()}
                                    className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors"
                                >
                                    Send Reply
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
