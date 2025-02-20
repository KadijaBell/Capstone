import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageHandler from '../MessageFunctions/MessageHandler'
import MessageThread from '../MessageFunctions/MessageThread';
import MessageNotification from '../MessageFunctions/MessageNotifications';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationBell from '../Notifications/NotificationBell';
import MessageFilters from '../MessageFunctions/MessageFilters';
import MessagePreview from '../MessageFunctions/MessagePreview';
import MessageThreadModal from '../MessageFunctions/MessageThreadModal';
import { FaSun, FaMoon } from 'react-icons/fa';
// import EventCard from "../EventCard/EventCard";
// import { fetchAPI } from "../../utils/api";
//import LoadingState from '../LoadingState/LoadingState';

function AdminDashboard() {
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        approvedEvents: 0,
        pendingRequests: 0,
        deniedRequests: 0
    });
    const [events, setEvents] = useState({
        approved: [],
        pending: [],
        denied: []
    });
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [messageFilter, setMessageFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showDenyForm, setShowDenyForm] = useState(null);
    const [denyReason, setDenyReason] = useState('');
    const [sortType, setSortType] = useState('newest');
    const [threadMessages, setThreadMessages] = useState({});
    const [showNewMessageForm, setShowNewMessageForm] = useState(false);
    const [showThreadModal, setShowThreadModal] = useState(false);
    const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark'
    );

    const unreadCount = messages.filter(msg => msg.status === 'unread').length;

    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/dashboard", {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (response.status === 401 || response.status === 403) {
                console.log(`Authorization error: ${response.status}`);
                navigate('/login');
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Admin dashboard data received:", data);

            if (!data || !data.events) {
                throw new Error("No data received from server");
            }

            const approved = data.events.filter(e => e.status === 'approved');
            const pending = data.events.filter(e => e.status === 'pending');
            const denied = data.events.filter(e => e.status === 'denied');

            setStats({
                approvedEvents: approved.length,
                pendingRequests: pending.length,
                deniedRequests: denied.length
            });

            setEvents({
                approved,
                pending,
                denied
            });

            if (data.messages) {
                setMessages(data.messages);
            }

        } catch (error) {
            console.error("Error in fetchDashboardData:", error);
            setError(error.message || "Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (user.role !== 'admin') {
            navigate('/dashboard');
            return;
        }

        fetchDashboardData();
    }, [user, navigate, fetchDashboardData]);

    const sortMessages = (messages, type) => {
        return [...messages].sort((a, b) => {
            switch (type) {
                case 'newest':
                    return new Date(b.created_at) - new Date(a.created_at);
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'unread':
                    if (a.status === 'unread' && b.status !== 'unread') return -1;
                    if (a.status !== 'unread' && b.status === 'unread') return 1;
                    return new Date(b.created_at) - new Date(a.created_at);
                default:
                    return 0;
            }
        });
    };

    useEffect(() => {
        if (!messages) return;

        let filtered = [...messages];

        // Apply filters
        switch (messageFilter) {
            case 'event':
                filtered = filtered.filter(message => message.event_id !== null);
                break;
            case 'service':
                filtered = filtered.filter(message => message.event_id === null);
                break;
            case 'unread':
            case 'read':
            case 'archived':
                filtered = filtered.filter(message => message.status === messageFilter);
                break;
            case 'active':
                filtered = filtered.filter(message => message.status !== 'archived');
                break;
            default:
                break;
        }

        // Apply search
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(message =>
                message.content.toLowerCase().includes(term) ||
                message.sender_name?.toLowerCase().includes(term) ||
                message.user_email?.toLowerCase().includes(term) ||
                (message.event?.title?.toLowerCase().includes(term))
            );
        }

        // Apply sorting
        filtered = sortMessages(filtered, sortType);
        setFilteredMessages(filtered);

    }, [messages, messageFilter, searchTerm, sortType]);

    useEffect(() => {
        console.log('Current user:', user);
        console.log('Current messages:', messages);
    }, [user, messages]);

    const showNotification = (message, type = 'success') => {
        setNotification({
            show: true,
            message,
            type
        });

        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const handleStatusUpdate = async (eventId, newStatus, message = '') => {
        try {
            const response = await fetch(`/api/admin/events/${eventId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    status: newStatus,
                    message: message // Optional message for denial reason
                })
            });

            if (!response.ok) throw new Error('Failed to update status');

            await fetchDashboardData();
            showNotification(`Event ${newStatus} successfully`, 'success');
        } catch (err) {
            console.error('Error updating status:', err);
            showNotification(`Failed to update event status`, 'error');
        }
    };

    const handleMessageSubmit = async (eventId, content) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    event_id: eventId,
                    content,
                    is_admin_message: true
                })
            });

            if (!response.ok) throw new Error('Failed to send message');

            const newMessage = await response.json();
            setMessages(prev => [...prev, newMessage]);
            setSelectedEvent(null);
            showNotification('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('Failed to send message', 'error');
        }
    };

    const handleReplySubmit = async (messageId, content) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    content,
                    is_admin_message: true
                })
            });

            if (!response.ok) throw new Error('Failed to send reply');

            const updatedMessage = await response.json();
            setMessages(messages.map(msg =>
                msg.id === messageId ? updatedMessage : msg
            ));
            setShowReplyForm(null);
            showNotification('Reply sent successfully');
        } catch (error) {
            console.error('Error sending reply:', error);
            showNotification('Failed to send reply', 'error');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to delete message');

            setMessages(messages.filter(msg => msg.id !== messageId));
            showNotification('Message deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting message:', error);
            showNotification('Failed to delete message', 'error');
        }
    };

    const handleEditMessage = async (messageId, newContent) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content: newContent })
            });

            if (!response.ok) throw new Error('Failed to update message');

            const updatedMessage = await response.json();
            setMessages(messages.map(msg =>
                msg.id === messageId ? updatedMessage : msg
            ));
            showNotification('Message updated successfully', 'success');
        } catch (error) {
            console.error('Error updating message:', error);
            showNotification('Failed to update message', 'error');
        }
    };

    const handleMessageStatusChange = async (messageId, newStatus) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update message status');

            const updatedMessage = await response.json();
            setMessages(messages.map(msg =>
                msg.id === messageId ? updatedMessage : msg
            ));
            showNotification('Message status updated');
        } catch (error) {
            console.error('Error updating message status:', error);
            showNotification('Failed to update message status', 'error');
        }
    };

    const fetchThreadMessages = async (threadId) => {
        try {
            const response = await fetch(`/api/admin/messages/thread/${threadId}`, {
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to fetch thread');

            const threadMessages = await response.json();
            return threadMessages;
        } catch (error) {
            console.error('Error fetching thread:', error);
            showNotification('Failed to load message thread', 'error');
            return [];
        }
    };

    const handleNewMessageSubmit = async (content, recipient) => {
        try {
            const response = await fetch('/api/admin/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    content,
                    event_id: recipient.recipientType === 'event' ? recipient.recipientId : null,
                    user_id: recipient.recipientType === 'user' ? recipient.recipientId : null,
                    is_admin_message: true
                })
            });

            if (!response.ok) throw new Error('Failed to create message');

            const newMessage = await response.json();
            setMessages(prev => [newMessage, ...prev]);
            setShowNewMessageForm(false);
            showNotification('Message created successfully');
        } catch (error) {
            console.error('Error creating message:', error);
            showNotification('Failed to create message', 'error');
        }
    };

    // const StatCard = ({ title, value, color }) => (
    //     <motion.div
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         className="bg-white p-6 rounded-lg shadow-md"
    //     >
    //         <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    //         <p className={`text-4xl font-bold ${color}`}>{value}</p>
    //     </motion.div>
    // );

    // Add theme toggle function
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    // Add theme initialization effect
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-ivory to-blush dark:from-midnight dark:to-charcoal p-6 pt-20">
            {/* Header Section */}
            <div className="bg-white/80 dark:bg-midnight/80 backdrop-blur-sm rounded-xl shadow-elegant p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-midnight dark:text-ivory">Admin Dashboard</h1>
                        <p className="text-charcoal/60 dark:text-ivory/60 mt-1">Manage Requests and Communications</p>
                    </div>
                    <div className="relative flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                        >
                            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </button>
                        <NotificationBell />
                        <button onClick={() => setIsInboxOpen(true)} className="bg-gold/10 text-gold px-4 py-2 rounded-lg">
                            Inbox {unreadCount > 0 && <span className="text-red-500">({unreadCount})</span>}
                        </button>
                    </div>
                </div>
            </div>


            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg shadow-elegant">{error}</div>
            ) : (
                <>
                    {/* Stats Cards  */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: 'var(--tw-shadow-hover)' }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-card border-l-4 border-gold
                            animate-slide-up hover:shadow-hover transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-midnight">Approved Events</h3>
                            <p className="text-4xl font-bold text-gold mt-2 animate-bounce-soft">{stats.approvedEvents}</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: 'var(--tw-shadow-hover)' }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-card border-l-4 border-mint
                            animate-slide-up hover:shadow-hover transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-midnight">Pending Requests</h3>
                            <p className="text-4xl font-bold text-mint mt-2 animate-bounce-soft">{stats.pendingRequests}</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02, boxShadow: 'var(--tw-shadow-hover)' }}
                            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-card border-l-4 border-charcoal
                            animate-slide-up hover:shadow-hover transition-all duration-300"
                        >
                            <h3 className="text-lg font-semibold text-midnight">Denied Requests</h3>
                            <p className="text-4xl font-bold text-charcoal mt-2 animate-bounce-soft">{stats.deniedRequests}</p>
                        </motion.div>
            </div>

            {/* Events Section */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-elegant p-6">
                        <div className="flex gap-4 mb-6 border-b border-gold/20">
                            {['approved', 'pending', 'denied'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setActiveTab(status)}
                                    className={`pb-2 px-4 font-medium transition-all ${
                                        activeTab === status
                                            ? 'border-b-2 border-gold text-gold'
                                            : 'text-charcoal hover:text-midnight'
                                    }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                ))}
            </div>

                        {/* Content Section */}
                    <div className="space-y-4">
                            {events[activeTab]?.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    whileHover={{ scale: 1.01 }}
                                    className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-card hover:shadow-hover
                                    transition-all duration-300 border-l-4 border-transparent hover:border-gold"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                    <div>
                                            <h3 className="text-xl font-bold">{event.title}</h3>
                                            <p className="text-gray-600">{event.description}</p>
                                        </div>
                                        {activeTab === 'pending' && (
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(event.id, 'approved')}
                                                        className="bg-mint text-white px-4 py-2 rounded hover:bg-mint/90 transition-all"
                                                    >
                                                        <i className="fas fa-check mr-2"></i>
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => setShowDenyForm(event.id)}
                                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
                                                    >
                                                        <i className="fas fa-times mr-2"></i>
                                                        Deny
                                                    </button>
                                                </div>
                                                {showDenyForm === event.id && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-2"
                                                    >
                                                        <textarea
                                                            placeholder="Reason for denial (optional)"
                                                            className="w-full p-2 border rounded"
                                                            value={denyReason}
                                                            onChange={(e) => setDenyReason(e.target.value)}
                                                        />
                                                        <div className="flex gap-2 mt-2">
                                                            <button
                                                                onClick={() => {
                                                                    handleStatusUpdate(event.id, 'denied', denyReason);
                                                                    setShowDenyForm(null);
                                                                    setDenyReason('');
                                                                }}
                                                                className="bg-red-500 text-white px-4 py-2 rounded"
                                                            >
                                                                Confirm Deny
                                                            </button>
                                                            <button
                                                                onClick={() => setShowDenyForm(null)}
                                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Inbox Modal */}
            <AnimatePresence>
                {isInboxOpen && (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        className="fixed right-0 top-[80px] h-[calc(100vh-80px)] w-[360px] bg-white dark:bg-midnight shadow-elegant flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-gold/10 flex items-center justify-between bg-white dark:bg-midnight/95">
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold text-midnight dark:text-ivory">Messages</h2>
                                {unreadCount > 0 && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsInboxOpen(false)}
                                className="text-charcoal/60 hover:text-charcoal dark:text-ivory/60 dark:hover:text-ivory"
                            >
                                <i className="fas fa-times" />
                            </button>
                        </div>

                        {/* Search & Filter Bar */}
                        <div className="p-3 border-b border-gold/10 bg-ivory/50 dark:bg-midnight/90">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-8 pr-3 py-1.5 rounded-md bg-white dark:bg-charcoal border border-gold/10 text-sm focus:outline-none focus:border-gold"
                                    />
                                    <i className="fas fa-search absolute left-2.5 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-ivory/40" />
                                </div>
                                <select
                                    value={messageFilter}
                                    onChange={(e) => setMessageFilter(e.target.value)}
                                    className="px-2 py-1.5 rounded-md bg-white dark:bg-charcoal border border-gold/10 text-sm"
                                >
                                    <option value="all">All</option>
                                    <option value="unread">Unread</option>
                                    <option value="read">Read</option>
                                </select>
                            </div>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 overflow-y-auto bg-ivory/30 dark:bg-midnight/30">
                            {filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`border-b border-gold/10 cursor-pointer transition-colors
                                        ${message.status === 'unread' ? 'bg-gold/5' : 'bg-transparent'}
                                        ${selectedThreadMessage?.id === message.id ? 'bg-gold/10' : 'hover:bg-gold/5'}`}
                                    onClick={() => {
                                        setSelectedThreadMessage(message);
                                        fetchThreadMessages(message.id);
                                    }}
                                >
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-medium text-midnight dark:text-ivory flex items-center gap-2">
                                                {message.sender_name}
                                                {message.status === 'unread' && (
                                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                                )}
                                            </h3>
                                            <span className="text-xs text-charcoal/60 dark:text-ivory/60">
                                                {new Date(message.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-charcoal/80 dark:text-ivory/80 line-clamp-2">
                                            {message.content}
                                        </p>

                                        {/* Message Actions */}
                                        <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMessageStatusChange(message.id, message.status === 'read' ? 'unread' : 'read');
                                                }}
                                                className="text-xs text-gold hover:text-gold/80 transition-colors"
                                            >
                                                {message.status === 'unread' ? 'Mark Read' : 'Mark Unread'}
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteMessage(message.id);
                                                }}
                                                className="text-xs text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Thread Messages */}
                                    {selectedThreadMessage?.id === message.id && threadMessages[message.id]?.length > 0 && (
                                        <div className="bg-white/50 dark:bg-charcoal/50 p-4 space-y-3">
                                            {threadMessages[message.id].map((reply) => (
                                                <div key={reply.id} className="pl-4 border-l-2 border-gold/20">
                                                    <div className="flex justify-between items-start">
                                                        <span className="text-sm font-medium text-gold">{reply.sender_name}</span>
                                                        <span className="text-xs text-charcoal/60 dark:text-ivory/60">
                                                            {new Date(reply.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-charcoal dark:text-ivory/80 mt-1">{reply.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* New Message Button */}
                        <div className="p-3 border-t border-gold/10 bg-white dark:bg-midnight/95">
                            <button
                                onClick={() => setShowNewMessageForm(true)}
                                className="w-full py-2 bg-gold hover:bg-gold/90 text-midnight rounded-md transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-pen" />
                                <span>New Message</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/*  Notifications */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <MessageNotification
                            message={notification.message}
                            type={notification.type}
                            onClose={() => setNotification({ show: false, message: '', type: 'success' })}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Pattern */}
            <div className="fixed inset-0 bg-pattern-dots bg-dots-sm opacity-5 pointer-events-none" />
        </div>
    );
}

export default AdminDashboard;
