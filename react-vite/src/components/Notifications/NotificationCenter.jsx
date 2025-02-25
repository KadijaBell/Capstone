import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function NotificationCenter({ notifications, onMarkRead, onClearAll }) {
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-xl">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
                    >
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-semibold">Notifications</h3>
                            <button
                                onClick={onClearAll}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {notifications.length === 0 ? (
                                <p className="p-4 text-center text-gray-500">
                                    No notifications
                                </p>
                            ) : (
                                notifications.map(notification => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-4 border-b hover:bg-gray-50 ${
                                            !notification.read ? 'bg-blue-50' : ''
                                        }`}
                                        onClick={() => onMarkRead(notification.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {notification.title}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {notification.content}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(notification.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NotificationCenter;
