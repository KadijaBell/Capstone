import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';
//import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../LoadingSpinner";
// import NotificationBell from '../Notifications/NotificationBell';
import ContactAdmin from '../ContactForm/ContactAdmin';
import EventServiceRequestForm from '../../components/EventRequestForm/EventServiceRequestForm'
import MessageThread from '../MessageFunctions/MessageThread';
import MessageFilters from '../MessageFunctions/MessageFilters';
import MessageHandler from '../MessageFunctions/MessageHandler';
import MessageNotification from '../MessageFunctions/MessageNotifications';
import MetricCard from '../MetricCard/MetricCard';
//import DashboardEventCard from '../EventCard/DashboardEventCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MessageInbox from '../MessageFunctions/MessageInbox';



function UserDashboard() {
    const user = useSelector(state => state.session.user);
    const [metrics, setMetrics] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        denied: 0
    });
    const [events, setEvents] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [showContactAdmin, setShowContactAdmin] = useState(false);
   // const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messageFilter, setMessageFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [showMessageInbox, setShowMessageInbox] = useState(false);
    //const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const navigate = useNavigate();
    const [threadMessages] = useState({});



    const fetchUserData = useCallback(async () => {
        setIsLoading(true);
        try {
            console.log('Fetching user data...'); // Debug log
            const response = await fetch('/api/events/dashboard', {
                credentials: 'include'
            });

            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard data');
            }

            const data = await response.json();
            console.log('Received dashboard data:', data); // Debug log

            if (data.events) {
                setEvents(data.events);
                console.log('Set events:', data.events); // Debug log
            }

            if (data.metrics) {
                setMetrics(data.metrics);
                console.log('Set metrics:', data.metrics); // Debug log
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchMessages = useCallback(async () => {
        try {
            const response = await fetch('/api/users/messages', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setMessages(data.messages || []);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role === 'admin') {
            navigate('/admin/dashboard');
            return;
        }

        fetchUserData();
        fetchMessages();
    }, [user,navigate, fetchUserData, fetchMessages]);

    // Add ESC key handler for modal
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setShowContactAdmin(false);
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    // Debug log when events or metrics change
    useEffect(() => {
        console.log('Events state updated:', events);
    }, [events]);

    useEffect(() => {
        console.log('Metrics state updated:', metrics);
    }, [metrics]);

    useEffect(() => {
        setFilteredMessages(messages);
    }, [messages]);

    useEffect(() => {

        const filterMessages = () => {
            let filtered = [...messages];

            // Apply status filter
            switch (messageFilter) {
                case 'unread':
                    filtered = filtered.filter(msg => !msg.read);
                    break;
                case 'read':
                    filtered = filtered.filter(msg => msg.read);
                    break;
                case 'urgent':
                    filtered = filtered.filter(msg => msg.urgent);
                    break;
                default: // 'all'
                    break;
            }

            // Apply search term if it exists
            if (searchTerm) {
                filtered = filtered.filter(msg =>
                    msg.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    msg.admin_reply?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredMessages(filtered);
        };

        filterMessages();
    }, [messages, messageFilter, searchTerm]);

    const handleRequestSubmit = async (formData) => {
        try {
            console.log('Submitting form data:', formData); // Debug log

            const requestData = {
                ...formData,
                type: formData.serviceType || 'event', // Provide default value
                status: 'pending'
            };

            console.log('Processed request data:', requestData); // Debug log

            const response = await fetch('/api/events/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add CSRF token if you're using it
                    // 'X-CSRFToken': getCookie('csrf_token')
                },
                credentials: 'include', // Important for session cookies
                body: JSON.stringify(requestData)
            });

            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit request');
            }

            await response.json();

            setShowRequestForm(false);
            await fetchUserData(); // Refresh dashboard data
            alert('Request submitted successfully!');
        } catch (error) {
            console.error('Submission error:', error);
            alert(`Failed to submit request: ${error.message}`);
        }
    };


    const handleMessageFilter = (filter) => {
        setMessageFilter(filter);
    };

    const handleMessageSearch = (term) => {
        setSearchTerm(term);
    };

    const handleMessageDelete = async (messageId) => {
        try {
            const response = await fetch(`/api/users/messages/${messageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to delete message');

            setMessages(prev => prev.filter(msg => msg.id !== messageId));
            setNotification({
                show: true,
                message: 'Message deleted successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error deleting message:', error);
            setNotification({
                show: true,
                message: 'Failed to delete message',
                type: 'error'
            });
        }
    };

    const handleMessageStatusChange = async (messageId, status) => {
        try {
            const response = await fetch(`/api/users/messages/${messageId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ status })
            });

            if (!response.ok) throw new Error('Failed to update message status');

            setMessages(prev =>
                prev.map(msg =>
                    msg.id === messageId ? { ...msg, status } : msg
                )
            );
        } catch (error) {
            console.error('Error updating message status:', error);
        }
    };

    const handleReplySubmit = async (messageId, content) => {
        try {
            if (!content.trim()) return;

            const response = await fetch(`/api/users/messages/${messageId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ content })
            });

            if (!response.ok) {
                throw new Error('Failed to send reply');
            }

            await response.json();

            // Refresh messages and thread messages
            await fetchMessages();

            // Fetch updated thread
            const threadResponse = await fetch(`/api/users/messages/${messageId}/thread`, {
                credentials: 'include'
            });

            if (threadResponse.ok) {
                const threadData = await threadResponse.json();
                threadMessages(threadData.messages);
            }

            setNotification({
                show: true,
                message: 'Reply sent successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error sending reply:', error);
            setNotification({
                show: true,
                message: 'Failed to send reply',
                type: 'error'
            });
        }
    };

    const handleEditEvent = async (eventId, updatedData) => {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Failed to update event');
            }

            // Refresh the events list
            await fetchUserData();
            setEditingEvent(null);
            setNotification({
                show: true,
                message: 'Event updated successfully'
            });
        } catch (error) {
            console.error('Error updating event:', error);
            setNotification({
                show: true,
                message: 'Failed to update event'
            });
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            // Refresh the events list
            await fetchUserData();
            setShowDeleteConfirm(null);
            setNotification({
                show: true,
                message: 'Event deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting event:', error);
            setNotification({
                show: true,
                message: 'Failed to delete event'
            });
        }
    };

    const handleMessageAdmin = async (content) => {
        try {
            const response = await fetch('/api/users/contact-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    message: content
                })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();
            setMessages(prev => [...prev, data]);
            setShowMessageForm(false);
            setMessageContent('');
            setNotification({
                show: true,
                message: 'Message sent successfully',
                type: 'success'
            });
        } catch (error) {
            console.error('Error sending message:', error);
            setNotification({
                show: true,
                message: 'Failed to send message',
                type: 'error'
            });
        }
    };

    // const handleMessageStatusChange = (messageId, newStatus) => {
    //     setMessages(prevMessages =>
    //         prevMessages.map(msg =>
    //             msg.id === messageId ? { ...msg, status: newStatus } : msg
    //         )
    //     );
    //     setFilteredMessages(prevFiltered =>
    //         prevFiltered.map(msg =>
    //             msg.id === messageId ? { ...msg, status: newStatus } : msg
    //         )
    //     );
    // };

    return (

    //    <div className="min-h-screen bg-gradient-to-br from-ivory to-blush pt-20">
    //         {/* Modern Header Section */}
    //         <div className="p-8 bg-white/80 backdrop-blur-sm shadow-sm">
    //             <div className="max-w-7xl mx-auto">
    //                 <div className="flex justify-between items-center">
    //                     <div>
    //                         <h1 className="text-3xl font-bold text-midnight">My  Dashboard</h1>
    //                         <p className="text-gray-600 mt-1">Welcome back! </p>
    //                     </div>
    //                     <div className="flex items-center space-x-4">
    //                         <NotificationBell />
    //                         <button
    //                             onClick={() => setIsInboxOpen(true)}
    //                             className="bg-midnight text-gold px-4 py-2 rounded-lg hover:bg-navy transition-all flex items-center gap-2 shadow-elegant"
    //                         >
    //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    //                                 <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    //                                 <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    //                             </svg>
    //                             Inbox
    //                             {messages.filter(m => !m.read).length > 0 && (
    //                                 <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
    //                                     {messages.filter(m => !m.read).length}
    //                                 </span>
    //                             )}
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>


        <div className="min-h-screen bg-gradient-to-br from-ivory to-blush dark:from-midnight/90 dark:to-charcoal/90 p-6 pt-20">
            {/* Header Section */}
            <div className="bg-white/80 dark:bg-midnight/80 backdrop-blur-sm rounded-xl shadow-elegant p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-midnight dark:text-ivory">User Dashboard</h1>
                        <p className="text-charcoal dark:text-ivory/80 mt-1">Manage Your Events</p>
                    </div>
                    <button
                        onClick={() => setShowMessageInbox(prev => !prev)}
                        className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90"
                    >
                        Inbox
                        {messages.filter(m => m.status === 'unread').length > 0 && (
                            <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                                {messages.filter(m => m.status === 'unread').length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-8">
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowContactAdmin(true)}
                        className="bg-gold/90 dark:bg-gold/80 backdrop-blur-sm text-midnight dark:text-ivory p-6 rounded-xl hover:bg-gold/80 dark:hover:bg-gold/70 transition-all shadow-elegant flex items-center gap-4"
                    >
                        <div className="bg-white/30 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-lg">Contact Admin</h3>
                            <p className="text-sm opacity-75">Get help or submit inquiries</p>
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowRequestForm(true)}
                        className="bg-mint/90 backdrop-blur-sm text-midnight p-6 rounded-xl hover:bg-mint/80 transition-all shadow-elegant flex items-center gap-4"
                    >
                        <div className="bg-white/30 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <h3 className="font-semibold text-lg">New Request</h3>
                            <p className="text-sm opacity-75">Submit a new event request</p>
                        </div>
                    </motion.button>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <MetricCard
                        title="Total Submissions"
                        value={metrics?.total ?? 0}
                        icon="📝"
                        color="bg-blue-50"
                    />
                    <MetricCard
                        title="Pending Review"
                        value={metrics?.pending ?? 0}
                        icon="⏳"
                        color="bg-yellow-50"
                    />
                    <MetricCard
                        title="Approved Events"
                        value={metrics?.approved ?? 0}
                        icon="✅"
                        color="bg-green-50"
                    />
                    <MetricCard
                        title="Rejected Events"
                        value={metrics?.denied ?? 0}
                        icon="❌"
                        color="bg-red-50"
                    />
                </div>

                {/* Events Section */}
                <div className="bg-white/80 dark:bg-midnight/80 backdrop-blur-sm rounded-xl p-6 shadow-elegant">
                    <h2 className="text-xl font-bold mb-4">Recent Proposals</h2>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : events.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No submissions found</p>
                    ) : (
                        <div className="space-y-4">
                            {events.map((event) => (
                                <div key={event.id}
                                    className="bg-white dark:bg-slate-800 rounded-lg shadow-elegant p-6"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-midnight dark:text-ivory">{event.title}</h3>
                                            <p className="text-charcoal/70 dark:text-ivory/70">{event.description}</p>
                                            <div className="mt-2">
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                                                    event.status === 'approved' ? 'bg-mint/20 text-mint' :
                                                    event.status === 'denied' ? 'bg-red-100 text-red-500' :
                                                    'bg-gold/20 text-gold'
                                                }`}>
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* <button
                                            onClick={() => handleMessageAdmin(event.title)}
                                            className="px-6 py-2 bg-gold hover:bg-gold/90 text-white rounded-md transition-colors"
                                        >
                                            Message Admin
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

                {/* Sliding Inbox Panel */}
                <AnimatePresence>
                    {isInboxOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black cursor-pointer"
                                onClick={() => setIsInboxOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                                className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-midnight">Message Inbox</h2>
                                        <button
                                            onClick={() => setIsInboxOpen(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                    <MessageFilters
                        onFilterChange={handleMessageFilter}
                        onSearch={handleMessageSearch}
                    />

                                    <div className="mt-6 space-y-4">
                                        {filteredMessages.length === 0 ? (
                                            <p className="text-gray-500 text-center py-8">No messages found</p>
                                        ) : (
                                            filteredMessages.map((message) => (
                                                <MessageThread
                                                    key={message.id}
                                                    message={{
                                                        id: message.id,
                                                        content: message.message,
                                                        sender_name: message.name,
                                                        created_at: message.created_at
                                                    }}
                                                    replies={message.admin_reply ? [{
                                                        id: `reply-${message.id}`,
                                                        content: message.admin_reply,
                                                        created_at: message.replied_at
                                                    }] : []}
                                                    onReply={(messageId) => setShowReplyForm(messageId)}
                                                    onDelete={handleMessageDelete}
                                                />
                                            ))
                                        )}
                                    </div>

                                    {showReplyForm && (
                                        <MessageHandler
                                            messageId={showReplyForm}
                                            onSubmit={handleReplySubmit}
                                            type="reply"
                                            onCancel={() => setShowReplyForm(null)}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            {/* Contact Admin Modal */}
            {showContactAdmin && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <ContactAdmin onClose={() => setShowContactAdmin(false)} />
                    </div>
                </div>
            )}

            {/* Request Form Modal */}
            {showRequestForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <EventServiceRequestForm
                        onSubmit={handleRequestSubmit}
                        onClose={() => setShowRequestForm(false)}
                    />
                </div>
            )}

            {/* Add notification display */}
            {notification.show && (
                <MessageNotification
                    message={notification.message}
                    onClose={() => setNotification({ show: false, message: '' })}
                />
            )}

            {editingEvent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <EventServiceRequestForm
                            onSubmit={(data) => handleEditEvent(editingEvent.id, data)}
                            onClose={() => setEditingEvent(null)}
                            initialData={editingEvent}
                            isEditing={true}
                        />
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                        <p className="mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteEvent(showDeleteConfirm)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Message Inbox */}
            <AnimatePresence>
                {showMessageInbox && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white dark:bg-midnight shadow-xl z-50"
                    >
                        <MessageInbox
                            messages={messages}
                            isAdmin={false}
                            onClose={() => setShowMessageInbox(false)}
                            onNewMessage={() => setShowMessageForm(true)}
                            onMessageDelete={handleMessageDelete}
                            onMessageStatusChange={handleMessageStatusChange}
                            onMessageReply={handleReplySubmit}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Message Form Modal */}
            {showMessageForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
                    >
                        <h3 className="text-xl font-bold mb-4">Message Admin</h3>
                        <textarea
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder="Write your message..."
                            className="w-full p-4 border rounded-lg mb-4 min-h-[120px]"
                        />
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => {
                                    setShowMessageForm(false);
                                    setMessageContent('');
                                }}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleMessageAdmin(messageContent)}
                                disabled={!messageContent.trim()}
                                className="px-4 py-2 bg-gold text-white rounded hover:bg-gold/90 disabled:opacity-50"
                            >
                                Send Message
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default UserDashboard;
