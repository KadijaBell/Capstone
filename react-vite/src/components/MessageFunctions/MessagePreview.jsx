import { motion } from 'framer-motion';

function MessagePreview({ message, onViewClick }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'unread':
                return 'bg-red-500';
            case 'read':
                return 'bg-blue-500';
            case 'archived':
                return 'bg-gray-500';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-50 p-3 rounded-lg cursor-pointer hover:shadow-md transition-all"
            onClick={onViewClick}
        >
            <div className="flex justify-between items-start">
                <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(message.status)}`} />
                        <p className="text-sm font-medium text-gray-700">
                            {message.sender_name}
                        </p>
                        <span className="text-xs text-gray-500">
                            {new Date(message.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {message.content}
                    </p>
                </div>
                {message.admin_reply && (
                    <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full">
                        Replied
                    </span>
                )}
            </div>
            {message.admin_reply && (
                <div className="mt-2 pl-3 border-l-2 border-gold/30">
                    <p className="text-xs text-gray-500 italic line-clamp-1">
                        {message.admin_reply}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

export default MessagePreview;
