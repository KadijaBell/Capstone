import { useState } from 'react';

function MessageHandler({ eventId, messageId, onSubmit, type, onCancel }) {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            if (type === 'reply') {
                await onSubmit(messageId, message);
            } else {
                await onSubmit(eventId, message);
            }
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="mt-4 border-t pt-4">
            <h4 className="text-lg font-semibold">
                {type === 'reply' ? 'Reply to Message' : 'Contact User'}
            </h4>
            <textarea
                className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-gold transition"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={type === 'reply' ? "Your reply..." : "Message to user..."}
            />
            <div className="flex gap-2">
                <button
                    onClick={handleSubmit}
                    className="bg-midnight text-gold px-4 py-2 rounded-lg hover:bg-navy transition"
                    disabled={!message.trim()}
                >
                    Send
                </button>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
}

export default MessageHandler;
