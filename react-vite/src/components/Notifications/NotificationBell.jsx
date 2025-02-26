import { useState, useRef, useEffect } from 'react';
// import { useNotifications } from '../../hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';
// import { FaBell } from 'react-icons/fa';

function NotificationBell({ notifications, onMarkRead }) {
    const [isOpen, setIsOpen] = useState(false);
    const validNotifications = notifications.filter(n =>
        n && n.timestamp && !isNaN(new Date(n.timestamp).getTime())
    );
    const unreadCount = validNotifications.filter(n => !n.read).length;
    const bellRef = useRef(null);

    // Close notifications when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={bellRef}>
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gold/10 transition-colors"
                style={{ zIndex: 50 }}
            >
                <span className="text-2xl">🔔</span>
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500
                                 text-white text-xs rounded-full flex items-center
                                 justify-center"
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed right-4 mt-2 w-80 max-h-[80vh] overflow-y-auto
                                 bg-white/90 dark:bg-midnight/90 backdrop-blur-sm
                                 rounded-xl shadow-elegant border border-gold/10"
                        style={{
                            zIndex: 9999,
                            position: 'fixed',
                            top: '4rem', 
                        }}
                    >
                        <div className="sticky top-0 p-4 border-b border-gold/10
                                    bg-white/90 dark:bg-midnight/90 backdrop-blur-sm">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-midnight dark:text-ivory">
                                    Notifications
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400
                                             dark:hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-gold/10">
                            {validNotifications.length === 0 ? (
                                <div className="p-4 text-center text-gray-500">
                                    No notifications
                                </div>
                            ) : (
                                validNotifications.map(notification => (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className={`p-4 ${!notification.read ? 'bg-mint/5' : ''}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-midnight
                                                          dark:text-ivory mb-1">
                                                    {notification.title || 'Notification'}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-2">
                                                    {new Date(notification.timestamp).toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: true
                                                    })}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <button
                                                    onClick={() => {
                                                        onMarkRead(notification.id);
                                                        setIsOpen(false);
                                                    }}
                                                    className="text-xs text-gold hover:text-gold/80"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
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

export default NotificationBell;
