import { motion } from 'framer-motion';
import MessageFilters from '../MessageFunctions/MessageFilters';
import MessagePreview from '../MessageFunctions/MessagePreview';
import MessageThreadModal from '../MessageFunctions/MessageThreadModal';
//import MessageHandler from '../MessageFunctions/MessageHandler';
import { useState } from 'react';

function MessageInbox({
    messages,
    onMessageStatusChange,
    onMessageDelete,
    onMessageReply,
    onMessageEdit,
    //onFetchThread,
    //events,
    isAdmin = false,
    onClose,
    //onNewMessage,
    //notifications
}) {
    const [selectedThread, setSelectedThread] = useState(null);
    const [threadMessages, setThreadMessages] = useState([]);
    const [replyContent, setReplyContent] = useState('');
    const [showThreadModal, setShowThreadModal] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('newest');
    const [showNotification] = useState(false);
    const [view, setView] = useState('messages' || 'thread'); 

    const fetchThreadMessages = async (messageId) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/thread`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
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

    const handleReply = async (messageId) => {
        try {
            if (!replyContent.trim()) return;

            const response = await fetch(`/api/messages/${messageId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ content: replyContent })
            });

            if (!response.ok) throw new Error('Failed to send reply');

            // Refresh thread messages
            await fetchThreadMessages(messageId);
            setReplyContent('');
            showNotification('Reply sent successfully');
        } catch (error) {
            console.error('Error sending reply:', error);
            showNotification('Failed to send reply', 'error');
        }
    };

    const handleViewThread = async (message) => {
        try {
            const endpoint = isAdmin
                ? `/api/admin/messages/${message.id}/thread`
                : `/api/users/messages/${message.id}/thread`;

            const response = await fetch(endpoint, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setThreadMessages(data.messages);
                setSelectedThread(message);
                setView('thread');
            } else {
                throw new Error('Failed to fetch thread');
            }
        } catch (error) {
            console.error('Error fetching thread:', error);
            alert('Failed to load message thread');
        }
    };

    // const handleMessagePreview = (message) => {
    //     setSelectedMessage(message);
    //     onMessageStatusChange(message.id, 'read');
    // };

    const handleDeleteMessage = async (messageId) => {
        try {
            const endpoint = isAdmin
                ? `/api/admin/messages/${messageId}`
                : `/api/users/messages/${messageId}`;

            const response = await fetch(endpoint, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete message');
            }

            // Call the parent's onMessageDelete to update state
            onMessageDelete(messageId);
            setSelectedThread(null);
            setShowThreadModal(false);
        } catch (error) {
            console.error('Error deleting message:', error);
            alert('Failed to delete message. Please try again.');
        }
    };

    // const handleEditMessage = async (messageId, content) => {
    //     try {
    //         await onMessageEdit(messageId, content);
    //         handleViewThread(selectedMessage); // Refresh thread after edit
    //     } catch (error) {
    //         console.error('Error editing message:', error);
    //     }
    // };

    return (
        <motion.div
            className="bg-white/90 dark:bg-midnight/90 backdrop-blur-sm rounded-xl shadow-elegant p-6
                      w-full max-w-4xl mx-auto fixed inset-0 sm:relative sm:inset-auto
                      overflow-y-auto border border-gold/10"
        >
            <div className="flex justify-between items-center mb-6 sticky top-0
                          bg-white/80 dark:bg-midnight/80 backdrop-blur-sm z-10 pb-4
                          border-b border-gold/10">
                <div className="flex items-center gap-4">
                    {view === 'thread' && (
                        <button
                            onClick={() => setView('messages')}
                            className="text-gold hover:text-gold/80"
                        >
                            ← Back to Messages
                        </button>
                    )}
                    <h2 className="text-2xl font-bold text-midnight dark:text-ivory">
                        {view === 'messages' ? 'Messages' : 'Message Thread'}
                    </h2>
                </div>
                {onClose && (
                    <button onClick={onClose}
                            className="rounded-full p-2 hover:bg-gold/10 transition-colors">
                        <span className="text-2xl">×</span>
                    </button>
                )}
            </div>

            {view === 'messages' ? (
                <>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <MessageFilters
                            onFilterChange={setFilter}
                            onSearch={setSearchTerm}
                            onSort={setSortType}
                            currentFilter={filter}
                            searchTerm={searchTerm}
                            currentSort={sortType}
                        />
                    </div>

                    <div className="space-y-4 mt-6 pb-20 sm:pb-0">
                        {messages.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                                <p className="text-lg">No messages found</p>
                                <p className="text-sm mt-2">Messages will appear here when you receive them</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {messages.map(message => (
                                    <MessagePreview
                                        key={message.id}
                                        message={message}
                                        isAdmin={isAdmin}
                                        onView={() => handleViewThread(message)}
                                        onDelete={() => handleDeleteMessage(message.id)}
                                        onStatusChange={onMessageStatusChange}
                                        onEdit={onMessageEdit}
                                        onReply={onMessageReply}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="space-y-4">
                    {selectedThread && (
                        <div className="space-y-4">
                            {threadMessages.map((msg, index) => (
                                <MessagePreview
                                    key={`${msg.id}-${index}`}
                                    message={msg}
                                    isAdmin={isAdmin}
                                    onDelete={onMessageDelete}
                                    onStatusChange={onMessageStatusChange}
                                    onEdit={onMessageEdit}
                                    onReply={onMessageReply}
                                    isThread
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {showThreadModal && selectedThread && (
                <MessageThreadModal
                    isOpen={showThreadModal}
                    onClose={() => setShowThreadModal(false)}
                    message={messages.find(m => m.id === selectedThread)}
                    threadMessages={threadMessages}
                    onReply={handleReply}
                    className="fixed inset-0 z-50 sm:relative"
                />
            )}
        </motion.div>
    );
}

export default MessageInbox;
