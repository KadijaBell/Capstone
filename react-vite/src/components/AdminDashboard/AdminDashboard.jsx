import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "../EventCard/EventCard";
import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../LoadingSpinner";

function AdminDashboard() {
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
    const [activeTab, setActiveTab] = useState('pending');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [eventsData, messagesData] = await Promise.all([
                fetchAPI("/api/admin/events"),
                fetchAPI("/api/admin/contact-submissions")
            ]);

            if (eventsData && Array.isArray(eventsData.events)) {
                const approved = eventsData.events.filter(e => e.status === 'approved');
                const pending = eventsData.events.filter(e => e.status === 'pending');
                const denied = eventsData.events.filter(e => e.status === 'denied');

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
            }

            if (messagesData && Array.isArray(messagesData.submissions)) {
                setMessages(messagesData.submissions);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setError("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleReplySubmit = async (messageId) => {
        try {
            await fetchAPI(`/api/admin/messages/${messageId}/reply`, {
                method: 'POST',
                body: JSON.stringify({ message: replyMessage })
            });

            setReplyMessage('');
            setReplyingTo(null);
            fetchDashboardData();
        } catch (error) {
            console.error("Error sending reply:", error);
            setError("Failed to send reply");
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Stats Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    onClick={() => setActiveTab('approved')}
                    className={`cursor-pointer bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-elegant
                        ${activeTab === 'approved' ? 'ring-2 ring-gold' : ''}`}
                >
                    <div className="text-3xl font-bold text-green-600">{stats.approvedEvents}</div>
                    <div className="text-charcoal/60">Approved Events</div>
                </div>
                <div
                    onClick={() => setActiveTab('pending')}
                    className={`cursor-pointer bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-elegant
                        ${activeTab === 'pending' ? 'ring-2 ring-gold' : ''}`}
                >
                    <div className="text-3xl font-bold text-gold">{stats.pendingRequests}</div>
                    <div className="text-charcoal/60">Pending Requests</div>
                </div>
                <div
                    onClick={() => setActiveTab('denied')}
                    className={`cursor-pointer bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-elegant
                        ${activeTab === 'denied' ? 'ring-2 ring-gold' : ''}`}
                >
                    <div className="text-3xl font-bold text-red-500">{stats.deniedRequests}</div>
                    <div className="text-charcoal/60">Denied Requests</div>
                </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
                className="flex gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'pending' ? 'bg-gold text-midnight' : 'bg-white/50 text-charcoal hover:bg-white/80'
                    }`}
                >
                    Pending
                </button>
                <button
                    onClick={() => setActiveTab('approved')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'approved' ? 'bg-gold text-midnight' : 'bg-white/50 text-charcoal hover:bg-white/80'
                    }`}
                >
                    Approved
                </button>
                <button
                    onClick={() => setActiveTab('denied')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'denied' ? 'bg-gold text-midnight' : 'bg-white/50 text-charcoal hover:bg-white/80'
                    }`}
                >
                    Denied
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-4 py-2 rounded-lg ${
                        activeTab === 'messages' ? 'bg-gold text-midnight' : 'bg-white/50 text-charcoal hover:bg-white/80'
                    }`}
                >
                    Messages
                </button>
            </motion.div>

            {/* Content Area */}
            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <LoadingSpinner />
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {activeTab === 'messages' ? (
                        messages.map((message, index) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-elegant hover:shadow-lg transition-all"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-gold">
                                                {message.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-midnight">{message.name}</h3>
                                            <p className="text-sm text-charcoal/60">{message.organization || 'Individual'}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-charcoal/60">
                                        {new Date(message.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <h4 className="font-semibold text-gold mb-2">{message.subject}</h4>
                                <p className="text-charcoal/80 mb-4">{message.message}</p>
                                <AnimatePresence>
                                    {replyingTo === message.id ? (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-4"
                                        >
                                            <textarea
                                                value={replyMessage}
                                                onChange={(e) => setReplyMessage(e.target.value)}
                                                placeholder="Type your reply..."
                                                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                                                rows={4}
                                            />
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={() => handleReplySubmit(message.id)}
                                                    className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
                                                >
                                                    Send Reply
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setReplyingTo(null);
                                                        setReplyMessage('');
                                                    }}
                                                    className="px-4 py-2 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => setReplyingTo(message.id)}
                                                className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                </svg>
                                                Reply
                                            </button>
                                            <button className="px-4 py-2 bg-white text-charcoal rounded-lg hover:bg-gray-50 transition-colors">
                                                Archive
                                            </button>
                                        </div>
                                    )}
                                </AnimatePresence>

                                {message.replies && message.replies.length > 0 && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <h5 className="text-sm font-semibold text-charcoal/60 mb-2">Previous Replies</h5>
                                        {message.replies.map((reply, replyIndex) => (
                                            <div key={replyIndex} className="bg-gray-50 rounded-lg p-3 mb-2">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="font-medium">{reply.admin_name}</span>
                                                    <span className="text-charcoal/60">
                                                        {new Date(reply.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-charcoal/80">{reply.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        events[activeTab].map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <EventCard
                                    event={event}
                                    onStatusChange={fetchDashboardData}
                                    showDetails={() => {
                                        // Add your event details modal/page navigation logic here
                                        console.log('Show event details:', event.id);
                                    }}
                                />
                            </motion.div>
                        ))
                    )}
                </motion.div>
            )}
        </div>
    );
}

export default AdminDashboard;
