import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import EventCard from "../EventCard/EventCard";
// import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageHandler from '../MessageFunctions/MessageHandler'
// import MessageFilters from './MessageFilters';
import MessageThread from '../MessageFunctions/MessageThread';
import MessageNotification from '../MessageFunctions/MessageNotifications';
//import LoadingState from '../LoadingState/LoadingState';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationBell from '../Notifications/NotificationBell';
import MessageFilters from '../MessageFunctions/MessageFilters';

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
    const [notification, setNotification] = useState({ show: false, message: '' });
    const [isInboxOpen, setIsInboxOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);

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

    useEffect(() => {
        if (!messages) return;

        let filtered = [...messages];

        if (messageFilter !== 'all') {
            filtered = filtered.filter(message => message.status === messageFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(message =>
                message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                message.user_email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredMessages(filtered);
    }, [messages, messageFilter, searchTerm]);

    useEffect(() => {
        console.log('Current user:', user);
        console.log('Current messages:', messages);
        console.log('Current replyingTo:', replyingTo);
    }, [user, messages, replyingTo]);

    const handleStatusUpdate = async (eventId, newStatus) => {
        try {
            const response = await fetch(`/api/admin/events/${eventId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ status: newStatus })
            });

            if (!response.ok) throw new Error('Failed to update status');

            fetchDashboardData();
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

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

    const handleReplySubmit = async (messageId, replyText) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/reply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ message: replyText })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to send reply: ${errorText}`);
            }

            const updatedMessage = await response.json();
            setMessages(messages.map(msg =>
                msg.id === messageId ? updatedMessage : msg
            ));
            setShowReplyForm(null);
            setNotification({
                show: true,
                message: 'Reply sent successfully'
            });
        } catch (error) {
            console.error('Error sending reply:', error);
            showNotification('Failed to send reply. Please try again.', 'error');
        }
    };

    const handleMessageSubmit = async (eventId, messageText) => {
        console.log('handleMessageSubmit called with:', { eventId, messageText });
        try {
            const response = await fetch(`/api/admin/events/${eventId}/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ message: messageText })
            });
            console.log('Message submit response:', response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to send message: ${errorText}`);
            }

            setNotification({
                show: true,
                message: 'Message sent successfully!'
            });
            setSelectedEvent(null);
            await fetchDashboardData();

        } catch (error) {
            console.error('Error sending message:', error);
            setNotification({
                show: true,
                message: 'Failed to send message. Please try again.'
            });
        }
    };

    const StatCard = ({ title, value, color }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
            <p className={`text-4xl font-bold ${color}`}>{value}</p>
        </motion.div>
    );

    const renderMessages = () => {
        console.log('renderMessages called with messages:', messages);
        return (
            <div className="space-y-4">
                {messages.map((message) => (
                    <MessageThread
                        key={message.id}
                        message={message}
                        replies={message.admin_reply ? [{
                            id: `reply-${message.id}`,
                            content: message.admin_reply,
                            created_at: message.replied_at
                        }] : []}
                        onReply={(messageId) => setReplyingTo(messageId)}
                    />
                ))}
                {replyingTo && (
                    <MessageHandler
                        messageId={replyingTo}
                        onSubmit={handleReplySubmit}
                        type="reply"
                        onCancel={() => setReplyingTo(null)}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {isLoading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-midnight">Admin Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <NotificationBell onClick={() => setIsInboxOpen(!isInboxOpen)} />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Stats Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <StatCard
                                title="Approved Events"
                                value={stats.approvedEvents}
                                color="text-green-600"
                            />
                            <StatCard
                                title="Pending Requests"
                                value={stats.pendingRequests}
                                color="text-yellow-600"
                            />
                            <StatCard
                                title="Denied Requests"
                                value={stats.deniedRequests}
                                color="text-red-600"
                            />
                        </div>

                    {/* Updated Tabs */}
                    <div className="flex gap-4 mb-6">
                        {['pending', 'approved', 'denied', 'messages'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg capitalize transition
                                    ${activeTab === tab
                                        ? 'bg-midnight text-gold'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                        {/* Messages Section */}
                        <AnimatePresence>
                            {isInboxOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                                >
                                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-xl font-bold">Message Inbox</h2>
                                            <button
                                                onClick={() => setIsInboxOpen(false)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <MessageFilters
                                            onFilterChange={setMessageFilter}
                                            onSearchChange={setSearchTerm}
                                            currentFilter={messageFilter}
                                            searchTerm={searchTerm}
                                        />

                                        <div className="space-y-4 mt-4">
                                            {filteredMessages.map(message => (
                                                <MessageThread
                                                    key={message.id}
                                                    message={message}
                                                    replies={message.admin_reply ? [{
                                                        id: `reply-${message.id}`,
                                                        content: message.admin_reply,
                                                        created_at: message.replied_at
                                                    }] : []}
                                                    onReply={(messageId) => setShowReplyForm(messageId)}
                                                />
                                            ))}
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
                            )}
                        </AnimatePresence>
                    </div>
                </>
            )}

            {/* Notification */}
            <AnimatePresence>
                {notification.show && (
                    <MessageNotification
                        message={notification.message}
                        onClose={() => setNotification({ show: false, message: '' })}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default AdminDashboard;
