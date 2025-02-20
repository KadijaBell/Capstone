import { motion, AnimatePresence } from 'framer-motion';

function NotificationSystem({ notifications, onClose }) {
    return (
        <AnimatePresence>
            {notifications.map((notification) => (
                <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
                        notification.type === 'message'
                            ? 'bg-midnight text-gold'
                            : 'bg-gold text-midnight'
                    }`}
                >
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h4 className="font-semibold">
                                {notification.type === 'message' ? 'New Message' : 'Notification'}
                            </h4>
                            <p className="text-sm">{notification.content}</p>
                        </div>
                        <button
                            onClick={() => onClose(notification.id)}
                            className="hover:opacity-80"
                        >
                            ×
                        </button>
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}

export default NotificationSystem;
