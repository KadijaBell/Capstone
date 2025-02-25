import { useState, useEffect } from 'react';
import MessageThread from './MessageThread';
import MessageHandler from './MessageHandler';
import MessageFilters from './MessageFilters';

function MessageCenter() {
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showMessageHandler, setShowMessageHandler] = useState(false);
    const [selectedThread, setSelectedThread] = useState(null);
    const [threadMessages, setThreadMessages] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Fetch messages
    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
    }, [isOpen]);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/admin/messages', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleNewMessage = async (content, recipient) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content, ...recipient })
            });
            if (response.ok) {
                fetchMessages();
                setShowMessageHandler(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

       // thread handling functions
       const handleThreadSelect = async (messageId) => {
        try {
            const response = await fetch(`/api/messages/${messageId}/thread`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch thread');
            }
            const data = await response.json();
            setThreadMessages(data.messages || []);
            setSelectedThread(messageId);
        } catch (error) {
            console.error('Error fetching thread:', error);
        }
    };

    // handler functions
    const handleReply = async (messageId, content) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content })
            });
            if (response.ok) {
                fetchMessages();
                if (selectedThread === messageId) {
                    handleThreadSelect(messageId);
                }
            }
        } catch (error) {
            console.error('Error replying to message:', error);
        }
    };

    const handleDelete = async (messageId) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setMessages(messages.filter(msg => msg.id !== messageId));
                if (selectedThread === messageId) {
                    setSelectedThread(null);
                    setThreadMessages([]);
                }
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleEdit = async (messageId, content) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content })
            });
            if (response.ok) {
                setMessages(messages.map(msg =>
                    msg.id === messageId ? { ...msg, content } : msg
                ));
            }
        } catch (error) {
            console.error('Error editing message:', error);
        }
    };

    const handleStatusChange = async (messageId, status) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                setMessages(messages.map(msg =>
                    msg.id === messageId ? { ...msg, status } : msg
                ));
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        filterAndSortMessages();
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterAndSortMessages();
    };

    const handleSort = (sortType) => {
        setSortBy(sortType);
        filterAndSortMessages();
    };

    const filterAndSortMessages = () => {
        let filteredMessages = [...messages];

        // Apply filter
        if (filter !== 'all') {
            filteredMessages = filteredMessages.filter(msg => {
                switch (filter) {
                    case 'unread': return msg.status === 'unread';
                    case 'read': return msg.status === 'read';
                    case 'event': return msg.event_id !== null;
                    case 'urgent': return msg.status === 'urgent';
                    case 'archived': return msg.status === 'archived';
                    default: return true;
                }
            });
        }

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredMessages = filteredMessages.filter(msg =>
                msg.content.toLowerCase().includes(term) ||
                msg.sender_name?.toLowerCase().includes(term) ||
                msg.recipient_name?.toLowerCase().includes(term)
            );
        }

        // Apply sort
        filteredMessages.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'unread':
                    return (a.status === 'unread') ? -1 : 1;
                default:
                    return 0;
            }
        });

        setMessages(filteredMessages);
    };

    return (
        <div className={`fixed inset-0 bg-black/50 z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}>
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Messages</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>
                <div className="p-4">
                    <div className="flex justify-between mb-4">
                        <MessageFilters
                            onFilterChange={handleFilterChange}
                            onSearch={handleSearch}
                            onSort={handleSort}
                            currentFilter={filter}
                            searchTerm={searchTerm}
                            currentSort={sortBy}
                        />
                        <button
                            onClick={() => setShowMessageHandler(true)}
                            className="bg-gold text-white px-4 py-2 rounded-lg"
                        >
                            New Message
                        </button>
                    </div>

                    {showMessageHandler && (
                        <MessageHandler
                            onSubmit={handleNewMessage}
                            onCancel={() => setShowMessageHandler(false)}
                        />
                    )}

                    <div className="space-y-4 mt-4">
                        {messages.map(message => (
                            <MessageThread
                                key={message.id}
                                message={message}
                                threadMessages={message.id === selectedThread ? threadMessages : []}
                                onReply={handleReply}
                                onDelete={handleDelete}
                                onEdit={handleEdit}
                                onStatusChange={handleStatusChange}
                                onThreadSelect={handleThreadSelect}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageCenter;
