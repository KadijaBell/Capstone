import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import LoadingSpinner from "../../components/LoadingSpinner";
import MessageNotification from '../MessageFunctions/MessageNotifications';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationBell from '../Notifications/NotificationBell';
import { FaSun, FaMoon } from 'react-icons/fa';
import MessageInbox from '../MessageFunctions/MessageInbox';
import EventManagement from '../EventCard/EventManagement';
import DashboardOverview from './DashboardOverview';
import MessageCenter from '../MessageFunctions/MessageCenter';

function AdminDashboard() {
    const navigate = useNavigate();
    const user = useSelector(state => state.session.user);

    // Core States
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [events, setEvents] = useState({
        pending: [],
        approved: [],
        denied: []
    });
    const [messages, setMessages] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [threadMessages, setThreadMessages] = useState([]);

    // UI States
    const [showMessageInbox, setShowMessageInbox] = useState(false);
    const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);

    // Derived States
    const unreadCount = messages.filter(msg => msg.status === 'unread').length;
    const filteredMessages = useMemo(() => {
        return messages.filter(msg => {
            switch (activeTab) {
                case 'pending':
                    return msg.status === 'unread';
                case 'approved':
                    return msg.status === 'read';
                case 'denied':
                    return msg.status === 'archived';
                default:
                    return true;
            }
        }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [messages, activeTab]);

    // Update notification handler to include type and title
    const handleNotification = useCallback((message, type = 'info', category = 'general') => {
        const newNotification = {
            id: Date.now(),
            message,
            type,
            category, // 'event' or 'message'
            timestamp: new Date(),
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    }, []);

    // Notification Handler
    const showNotification = useCallback((message, type = 'success') => {
        setNotifications(prev => [
            ...prev,
            {
                id: Date.now(),
                message,
                type,
                timestamp: new Date(),
                read: false,
                title: type === 'success' ? 'Success' : 'Notification'
            }
        ]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== Date.now()));
        }, 5000);
    }, []);

    // Filter out invalid notifications
    const validNotifications = useMemo(() => {
        return notifications.filter(notification =>
            notification.message &&
            notification.timestamp &&
            !notification.message.includes('undefined') &&
            !notification.message.includes('Invalid Date')
        );
    }, [notifications]);

    // Theme Handler
    const toggleTheme = useCallback(() => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        document.documentElement.classList.toggle('dark', newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // fetchDashboardData
    const fetchDashboardData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/admin/dashboard', {
                credentials: 'include'
            });

            if (!response.ok) throw new Error('Failed to fetch dashboard data');

            const data = await response.json();

            // Organize events by status
            const eventsByStatus = {
                pending: [],
                approved: [],
                denied: []
            };

            data.events.forEach(event => {
                switch (event.status) {
                    case 'pending':
                        eventsByStatus.pending.push(event);
                        break;
                    case 'approved':
                        eventsByStatus.approved.push(event);
                        break;
                    case 'denied':
                        eventsByStatus.denied.push(event);
                        break;
                    default:
                        break;
                }
            });

            setEvents(eventsByStatus);
            setMessages(data.dashboard_data.messages || []);
            setNotifications(data.dashboard_data.notifications || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data');
            setIsLoading(false);
        }
    }, []);

    // Update handleEventAction to properly handle events
    const handleEventAction = useCallback(async (eventId, action, data = null) => {
        try {
            const endpoint = action === 'edit_request'
                ? `/api/admin/events/${eventId}/edit-request`
                : `/api/admin/events/${eventId}/${action}`;

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data || {})
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to ${action} event`);
            }

            // Update local state based on action
            setEvents(prev => {
                const event = prev.pending.find(e => e.id === eventId);
                if (!event) return prev;

                const newState = { ...prev };

                if (action === 'edit_request') {
                    newState.pending = prev.pending.map(e =>
                        e.id === eventId
                            ? { ...e, edit_requested: true, edit_message: data.request }
                            : e
                    );
                } else {
                    newState.pending = prev.pending.filter(e => e.id !== eventId);
                    if (action === 'approve') {
                        newState.approved = [...prev.approved, { ...event, status: 'approved' }];
                    } else if (action === 'deny') {
                        newState.denied = [...prev.denied, { ...event, status: 'denied' }];
                    }
                }

                return newState;
            });

            // Add notifications
            switch (action) {
                case 'approve':
                    handleNotification('Event approved successfully', 'success', 'event');
                    break;
                case 'deny':
                    handleNotification('Event denied', 'info', 'event');
                    break;
                case 'message':
                    handleNotification('New message received', 'info', 'message');
                    break;
            }

            await fetchDashboardData();
        } catch (error) {
            console.error(`Error ${action}ing event:`, error);
            handleNotification(error.message, 'error');
        }
    }, [fetchDashboardData, handleNotification]);

    // Update handleMessageAction to properly handle read status
    const handleMessageAction = useCallback(async (messageId, action, content = null) => {
        try {
            let endpoint = `/api/admin/messages/${messageId}`;
            let method = 'POST';
            let body = {};

            switch (action) {
                case 'delete':
                    method = 'DELETE';
                    break;
                case 'read':
                case 'status':
                    endpoint = `${endpoint}/status`;
                    method = 'PATCH';
                    body = { status: 'read' };
                    break;
                case 'reply':
                    endpoint = `${endpoint}/reply`;
                    body = { content };
                    break;
                default:
                    throw new Error('Invalid action');
            }

            const response = await fetch(endpoint, {
                method,
                headers: method !== 'DELETE' ? { 'Content-Type': 'application/json' } : {},
                credentials: 'include',
                body: method !== 'DELETE' ? JSON.stringify(body) : undefined
            });

            if (!response.ok) throw new Error(`Failed to ${action} message`);

            // Update local state based on action
            if (action === 'delete') {
                setMessages(prev => prev.filter(m => m.id !== messageId));
            } else if (action === 'read' || action === 'status') {
                setMessages(prev =>
                    prev.map(m => m.id === messageId ? { ...m, status: 'read' } : m)
                );
                // Update unread count
                const updatedMessage = await response.json();
                if (updatedMessage) {
                    handleNotification('Message marked as read', 'success', 'message');
                }
            }
        } catch (error) {
            console.error(`Error ${action}ing message:`, error);
            handleNotification('error', error.message, 'message');
        }
    }, [handleNotification]);

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

    // UI State Management
    const handleUIState = useMemo(() => ({
        toggleInbox: () => setShowMessageInbox(prev => !prev),
        toggleReplyForm: (messageId = null) => {
            setSelectedThreadMessage(messageId ? messages.find(m => m.id === messageId) : null);
        },
        toggleNewMessageForm: () => setSelectedThreadMessage(null),
        handleSearch: () => setSelectedThreadMessage(null),
        handleFilter: (filter) => setActiveTab(filter),
        handleSort: (type) => setActiveTab(type)
    }), [setShowMessageInbox, setSelectedThreadMessage, messages, setActiveTab]);

    useEffect(() => {
        console.log('Current user:', user);
        console.log('Current messages:', messages);
    }, [user, messages]);

    // Fix the unused notificationId in NotificationCenter
    const handleNotificationMarkRead = useCallback((notificationId) => {
        // Update the specific notification
        setNotifications(prev =>
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        // Then update the message status
        handleMessageAction(notificationId, 'status', 'read');
    }, [handleMessageAction]);

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
            setSelectedThreadMessage(null);
            showNotification('Reply sent successfully');
        } catch (error) {
            console.error('Error sending reply:', error);
            showNotification('Failed to send reply', 'error');
        }
    };

    const handleEditMessage = useCallback(async (messageId, newContent) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ content: newContent })
            });

            if (!response.ok) throw new Error('Failed to edit message');

            const updatedMessage = await response.json();
            setMessages(prev =>
                prev.map(msg => msg.id === messageId ? updatedMessage : msg)
            );
            showNotification('Message updated successfully', 'success');
        } catch (error) {
            console.error('Error editing message:', error);
            showNotification('Failed to edit message', 'error');
        }
    }, [setMessages, showNotification]);

    // Add theme initialization effect
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
            document.documentElement.classList.toggle('dark', savedTheme === 'dark');
        }
    }, []);

    // Implement setIsLoading and setError
    useEffect(() => {
        setIsLoading(true);
        fetchDashboardData()
            .catch(err => {
                setError(err.message);
                showNotification(err.message, 'error');
            })
            .finally(() => setIsLoading(false));
    }, [fetchDashboardData, showNotification]);

    // Fix the useEffect dependency warning by moving the initialization outside
    const initializeUIState = useCallback(() => {
        handleUIState.handleFilter('all');
        handleUIState.handleSort('newest');
    }, [handleUIState]);

    useEffect(() => {
        initializeUIState();
    }, [initializeUIState]);

    const handleTabChange = useCallback((tab) => {
        setActiveTab(tab);

        // Show message inbox when clicking unread messages
        if (tab === 'messages') {
            setShowMessageInbox(true);
        }
    }, []);

    const handleViewThread = useCallback(async (messageId) => {
        try {
            const response = await fetch(`/api/admin/messages/${messageId}/thread`, {
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
            setSelectedThreadMessage(messageId);
            handleMessageAction(messageId, 'read');
        } catch (error) {
            console.error('Error fetching thread:', error);
            showNotification('Failed to load message thread', 'error');
        }
    }, [handleMessageAction, showNotification]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-ivory to-blush dark:from-midnight dark:to-charcoal p-6 pt-20">
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                </div>
            ) : (
                <>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}

                    <div className="bg-white/80 dark:bg-midnight/80 backdrop-blur-sm rounded-xl shadow-elegant p-6 mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-midnight dark:text-ivory">Admin Dashboard</h1>
                                <p className="text-charcoal/60 dark:text-ivory/60 mt-1">Manage Requests and Communications</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-colors"
                                >
                                    {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                                </button>
                                <NotificationBell
                                    notifications={notifications}
                                    onMarkRead={handleNotificationMarkRead}
                                />
                                <button
                                    onClick={() => setShowMessageInbox(!showMessageInbox)}
                                    className="relative bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold/90"
                                >
                                    Inbox
                                    {(unreadCount + validNotifications.filter(n => !n.read).length) > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount + validNotifications.filter(n => !n.read).length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <DashboardOverview
                        stats={{
                            pendingEvents: events.pending.length,
                            approvedEvents: events.approved.length,
                            deniedRequests: events.denied.length,
                            unreadMessages: messages.filter(m => !m.read).length
                        }}
                        onTabChange={handleTabChange}
                    />

                    <div className="space-y-8">
                        {activeTab === 'messages' ? (
                            <MessageCenter />
                        ) : (
                            <>
                                {activeTab === 'pending' && (
                                    <EventManagement
                                        events={events.pending}
                                        onEventAction={handleEventAction}
                                        title="Pending Events"
                                    />
                                )}
                                {activeTab === 'approved' && (
                                    <EventManagement
                                        events={events.approved}
                                        onEventAction={handleEventAction}
                                        title="Approved Events"
                                    />
                                )}
                                {activeTab === 'denied' && (
                                    <EventManagement
                                        events={events.denied}
                                        onEventAction={handleEventAction}
                                        title="Denied Events"
                                    />
                                )}
                            </>
                        )}
                    </div>

                    <div id="messages-section">
                        {showMessageInbox && (
                            <MessageInbox
                                messages={filteredMessages}
                                notifications={notifications}
                                isAdmin={true}
                                onClose={() => setShowMessageInbox(false)}
                                onMessageStatusChange={handleMessageAction}
                                onMessageDelete={handleMessageAction}
                                onMessageReply={handleReplySubmit}
                                onMessageEdit={handleEditMessage}
                                onFetchThread={handleViewThread}
                                threadMessages={threadMessages}
                                selectedMessage={selectedThreadMessage}
                                onSelectMessage={setSelectedThreadMessage}
                            />
                        )}
                    </div>

                    <AnimatePresence>
                        {selectedThreadMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="fixed bottom-4 right-4 z-50"
                            >
                                <MessageNotification
                                    message={selectedThreadMessage.content}
                                    type={selectedThreadMessage.status === 'unread' ? 'unread' : 'read'}
                                    onClose={() => setSelectedThreadMessage(null)}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="fixed inset-0 bg-pattern-dots bg-dots-sm opacity-5 pointer-events-none" />
                </>
            )}
        </div>
    );
}

export default AdminDashboard;
