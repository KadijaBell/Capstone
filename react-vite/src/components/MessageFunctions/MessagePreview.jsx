import { motion } from 'framer-motion';
import { useState } from 'react';

function MessagePreview({ message, isAdmin, onView, onDelete, onStatusChange, onEdit, onReply }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(message.content);
    const [replyContent, setReplyContent] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    };

    // const getStatusColor = (status) => {
    //     switch (status) {
    //         case 'unread':
    //             return 'bg-red-500';
    //         case 'read':
    //             return 'bg-blue-500';
    //         case 'archived':
    //             return 'bg-gray-500';
    //         default:
    //             return 'bg-gray-300';
    //     }
    // };

    const handleReplySubmit = (e) => {
        e.preventDefault();
        onReply(message.id, replyContent);
        setReplyContent('');
        setShowReplyForm(false);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this message?')) {
            onDelete(message.id);
        }
    };

    const handleMarkAsRead = (e) => {
        e.stopPropagation();
        onStatusChange(message.id, 'read');
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        if (!isAdmin && message.is_admin_message) {
            return;
        }
        setIsEditing(true);
    };

    const handleEditSubmit = () => {
        onEdit(message.id, editContent);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
                border border-gold/10 rounded-xl p-5
                ${message.status === 'unread'
                    ? 'bg-mint/5 dark:bg-mint/10'
                    : 'bg-white/50 dark:bg-midnight/50'}
                backdrop-blur-sm hover:shadow-elegant transition-all duration-300
            `}
        >
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-medium text-midnight dark:text-ivory">
                            {isAdmin ? message.sender_name : (message.is_admin_message ? 'Admin' : message.sender_name)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDateTime(message.created_at)}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {message.status === 'unread' && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gold/20 text-gold">
                                New
                            </span>
                        )}
                    </div>
                </div>

                <div className="text-gray-700 dark:text-gray-300">
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full p-3 border rounded-lg"
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                                <button onClick={handleEditSubmit}>Save</button>
                            </div>
                        </div>
                    ) : (
                        <p>{message.content}</p>
                    )}
                </div>

                {message.admin_reply && !isAdmin && (
                    <div className="mt-4 pl-4 border-l-2 border-gold/30">
                        <p className="text-sm text-gold mb-1">Admin Reply:</p>
                        <p className="text-gray-700 dark:text-gray-300">{message.admin_reply}</p>
                    </div>
                )}

                <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gold/10">
                    <button
                        onClick={onView}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                 bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                    >
                        <span>💬</span> Thread
                    </button>
                    {isAdmin && (
                        <>
                            <button
                                onClick={() => setShowReplyForm(!showReplyForm)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                         bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                            >
                                <span>↩️</span>
                            </button>
                            <button
                                onClick={handleMarkAsRead}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                         bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                            >
                                <span>✓</span>
                            </button>
                            <button
                                onClick={handleEdit}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                         bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                            >
                                <span>✏️</span>
                            </button>
                        </>
                    )}
                    {!isAdmin && (
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                     bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                        >
                            <span>✏️</span>
                        </button>
                    )}
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                                 bg-gold/10 hover:bg-gold/20 text-gold transition-colors"
                    >
                        <span>🗑️</span>
                    </button>
                </div>

                {showReplyForm && isAdmin && (
                    <form onSubmit={handleReplySubmit} className="mt-4">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write your reply..."
                            className="w-full p-3 border border-gold/20 rounded-lg bg-white/50
                                     dark:bg-midnight/50 backdrop-blur-sm focus:ring-2
                                     focus:ring-gold/20 outline-none mb-3"
                            rows="3"
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowReplyForm(false)}
                                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100
                                         dark:text-gray-400 dark:hover:bg-midnight/50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!replyContent.trim()}
                                className="px-4 py-2 rounded-lg bg-gold text-white hover:bg-gold/90
                                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Send Reply
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </motion.div>
    );
}

export default MessagePreview;
