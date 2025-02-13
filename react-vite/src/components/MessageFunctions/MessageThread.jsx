import { motion } from 'framer-motion';

function MessageThread({ message, replies, onReply, onDelete }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
        >
            <div className="flex justify-between items-start">
                <div className="mb-4 border-l-4 border-gold pl-4">
                    <p className="text-gray-600">{message.content}</p>
                    <p className="text-sm text-gray-500">
                        From: {message.sender_name} •
                        {new Date(message.created_at).toLocaleDateString()}
                    </p>
                </div>
                <button
                    onClick={() => onDelete(message.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Delete message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {replies && replies.length > 0 && (
                <div className="ml-8 space-y-4">
                    {replies.map((reply) => (
                        <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                            <p className="text-gray-600">{reply.content}</p>
                            <p className="text-sm text-gray-500">
                                {new Date(reply.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            <button
                onClick={() => onReply(message.id)}
                className="mt-4 bg-gold text-midnight px-4 py-2 rounded hover:bg-gold/80 transition"
            >
                Reply
            </button>
        </motion.div>
    );
}

export default MessageThread;
