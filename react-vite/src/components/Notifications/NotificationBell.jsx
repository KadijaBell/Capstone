import { useState, useEffect } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { motion, AnimatePresence } from 'framer-motion';

function NotificationBell() {
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        if (!showDropdown) return;

        const closeDropdown = (e) => {
            if (!e.target.closest('.notification-dropdown')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, [showDropdown]);

    return (
        <div className="relative z-50">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative z-50 hover:text-gold transition-colors p-2"
            >
                <svg
                    className="w-6 h-6 text-midnight"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-[60] border border-gray-200"
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                            {notifications.length === 0 ? (
                                <p className="text-gray-500">No notifications</p>
                            ) : (
                                <div className="space-y-4">
                                    {notifications.map((notif) => (
                                        <div
                                            key={notif.id}
                                            className={`p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-blue-50'}`}
                                            onClick={() => markAsRead(notif.id)}
                                        >
                                            <p className="text-sm">{notif.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(notif.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default NotificationBell;
