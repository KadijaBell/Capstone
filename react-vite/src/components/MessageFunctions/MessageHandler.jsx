import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
//messageId, eventId,
function MessageHandler({ onSubmit, onCancel, type = 'new', events = [], messageId = null }) {
    const [content, setContent] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [recipientType, setRecipientType] = useState('event');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    // Fetch users for the dropdown
    useEffect(() => {
        if (type === 'new' && recipientType === 'user') {
            const fetchUsers = async () => {
                try {
                    const response = await fetch('/api/admin/users', {
                        credentials: 'include'
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setUsers(data.users);
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }
    }, [type, recipientType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === 'new') {
            onSubmit(content, {
                recipientType,
                recipientId: recipientType === 'event' ? selectedEvent : selectedUser
            });
        } else {
            onSubmit(messageId, content);
        }
        setContent('');
        setSelectedEvent('');
        setSelectedUser('');
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-gray-50 p-4 rounded-lg"
            onSubmit={handleSubmit}
        >
            {type === 'new' && (
                <div className="mb-4">
                    <div className="flex gap-4 mb-2">
                        <button
                            type="button"
                            onClick={() => setRecipientType('event')}
                            className={`px-4 py-2 rounded-lg ${
                                recipientType === 'event'
                                    ? 'bg-gold text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Send to Event
                        </button>
                        <button
                            type="button"
                            onClick={() => setRecipientType('user')}
                            className={`px-4 py-2 rounded-lg ${
                                recipientType === 'user'
                                    ? 'bg-gold text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Send to User
                        </button>
                    </div>

                    {recipientType === 'event' && events.length > 0 && (
                        <select
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">Select Event</option>
                            {events.map(event => (
                                <option key={event.id} value={event.id}>
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    )}

                    {recipientType === 'user' && users.length > 0 && (
                        <select
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.email} ({user.username})
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={type === 'new' ? "Write your message..." : "Write your reply..."}
                className="w-full p-2 border rounded-lg mb-2"
                rows="4"
                required
            />

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/90 transition-colors"
                    disabled={!content.trim() || (type === 'new' && !selectedEvent && !selectedUser)}
                >
                    {type === 'new' ? 'Send Message' : 'Send Reply'}
                </button>
            </div>
        </motion.form>
    );
}

export default MessageHandler;
