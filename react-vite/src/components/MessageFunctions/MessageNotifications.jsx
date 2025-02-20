import { motion, AnimatePresence } from 'framer-motion';

function MessageNotification({ message, onClose }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed top-4 right-4 bg-midnight text-gold p-4 rounded-lg shadow-lg z-50"
            >
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h4 className="font-semibold">New Message</h4>
                        <p className="text-sm">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gold hover:text-gold/80"
                    >
                        ×
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default MessageNotification;
