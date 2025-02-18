import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../components/LoadingSpinner";
import MessageHandler from "../MessageFunctions/MessageHandler";
import MessageThread from "../MessageFunctions/MessageThread";
import MessageNotification from "../MessageFunctions/MessageNotifications";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NotificationBell from "../Notifications/NotificationBell";
import MessageFilters from "../MessageFunctions/MessageFilters";
import MessageThreadModal from "../MessageFunctions/MessageThreadModal";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  // Dashboard state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    approvedEvents: 0,
    pendingRequests: 0,
    deniedRequests: 0,
  });
  const [events, setEvents] = useState({
    approved: [],
    pending: [],
    denied: [],
  });

  // Messaging state
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [messageFilter, setMessageFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(null);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDenyForm, setShowDenyForm] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [threadMessages, setThreadMessages] = useState({});
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [showThreadModal, setShowThreadModal] = useState(false);
  const [selectedThreadMessage, setSelectedThreadMessage] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const unreadCount = messages.filter((msg) => msg.status === "unread").length;

  // Fetch data from the backend
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/dashboard", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (response.status === 401 || response.status === 403) {
        navigate("/login");
        return;
      }
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data || !data.events) throw new Error("No data received from server");

      const approved = data.events.filter((e) => e.status === "approved");
      const pending = data.events.filter((e) => e.status === "pending");
      const denied = data.events.filter((e) => e.status === "denied");

      setStats({
        approvedEvents: approved.length,
        pendingRequests: pending.length,
        deniedRequests: denied.length,
      });
      setEvents({ approved, pending, denied });
      if (data.messages) setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message || "Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    fetchDashboardData();
  }, [user, navigate, fetchDashboardData]);

  // Filter, search, and sort messages
  useEffect(() => {
    if (!messages) return;
    let filtered = [...messages];

    if (selectedEvent) {
      filtered = filtered.filter(msg => msg.event_id === selectedEvent);
    }

    switch (messageFilter) {
      case "event":
        filtered = filtered.filter((msg) => msg.event_id !== null);
        break;
      case "service":
        filtered = filtered.filter((msg) => msg.event_id === null);
        break;
      case "unread":
      case "read":
      case "archived":
        filtered = filtered.filter(message => message.status === messageFilter);
        break;
      case "active":
        filtered = filtered.filter((msg) => msg.status !== "archived");
        break;
      default:
        break;
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((msg) =>
        msg.content.toLowerCase().includes(term) ||
        msg.sender_name?.toLowerCase().includes(term) ||
        msg.user_email?.toLowerCase().includes(term) ||
        (msg.event?.title?.toLowerCase().includes(term))
      );
    }
    filtered = filtered.sort((a, b) => {
      switch (sortType) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);
        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);
        case "unread":
          if (a.status === "unread" && b.status !== "unread") return -1;
          if (a.status !== "unread" && b.status === "unread") return 1;
          return new Date(b.created_at) - new Date(a.created_at);
        default:
          return 0;
      }
    });
    setFilteredMessages(filtered);
  }, [messages, messageFilter, searchTerm, sortType, selectedEvent]);

  const showNotification = (msg, type = "success") => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 3000);
  };

  const handleStatusUpdate = async (eventId, newStatus, msg = "") => {
    try {
      const response = await fetch(`/api/admin/events/${eventId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus, message: msg }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      await fetchDashboardData();
      showNotification(`Event ${newStatus} successfully`, "success");
    } catch (err) {
      console.error("Error updating status:", err);
      showNotification("Failed to update event status", "error");
    }
  };

  const handleMessageSubmit = async (eventId, content) => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ event_id: eventId, content, is_admin_message: true }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setSelectedEvent(null);
      showNotification("Message sent successfully", "success");
    } catch (error) {
      console.error("Error sending message:", error);
      showNotification("Failed to send message", "error");
    }
  };

  const handleReplySubmit = async (messageId, content) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content, is_admin_message: true }),
      });
      if (!response.ok) throw new Error("Failed to send reply");
      const updatedMessage = await response.json();
      setMessages(messages.map((msg) => (msg.id === messageId ? updatedMessage : msg)));
      setShowReplyForm(null);
      showNotification("Reply sent successfully", "success");
    } catch (error) {
      console.error("Error sending reply:", error);
      showNotification("Failed to send reply", "error");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to delete message");
      setMessages(messages.filter((msg) => msg.id !== messageId));
      showNotification("Message deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting message:", error);
      showNotification("Failed to delete message", "error");
    }
  };

  const handleEditMessage = async (messageId, newContent) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content: newContent }),
      });
      if (!response.ok) throw new Error("Failed to update message");
      const updatedMessage = await response.json();
      setMessages(messages.map((msg) => (msg.id === messageId ? updatedMessage : msg)));
      showNotification("Message updated successfully", "success");
    } catch (error) {
      console.error("Error updating message:", error);
      showNotification("Failed to update message", "error");
    }
  };

  const handleMessageStatusChange = async (messageId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update message status");
      const updatedMessage = await response.json();
      setMessages(messages.map((msg) => (msg.id === messageId ? updatedMessage : msg)));
      showNotification("Message status updated", "success");
    } catch (error) {
      console.error("Error updating message status:", error);
      showNotification("Failed to update message status", "error");
    }
  };

  const fetchThreadMessages = async (threadId) => {
    try {
      const response = await fetch(`/api/admin/messages/thread/${threadId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch thread");
      const threadMsgs = await response.json();
      return threadMsgs;
    } catch (error) {
      console.error("Error fetching thread:", error);
      showNotification("Failed to load message thread", "error");
      return [];
    }
  };

  const handleNewMessageSubmit = async (content, recipient) => {
    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content,
          event_id: recipient.recipientType === "event" ? recipient.recipientId : null,
          user_id: recipient.recipientType === "user" ? recipient.recipientId : null,
          is_admin_message: true,
        }),
      });
      if (!response.ok) throw new Error("Failed to create message");
      const newMessage = await response.json();
      setMessages((prev) => [newMessage, ...prev]);
      setShowNewMessageForm(false);
      showNotification("Message created successfully", "success");
    } catch (error) {
      console.error("Error creating message:", error);
      showNotification("Failed to create message", "error");
    }
  };

  useEffect(() => {
    console.log("Current user:", user);
    console.log("Messages:", messages);
  }, [user, messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight/95 to-midnight p-6 pt-20">
      {/* Header Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-elegant p-8 mb-8 border border-white/10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-ivory/90">Admin Dashboard</h1>
            <p className="text-ivory/60 mt-2">Manage Requests and Communications</p>
          </div>
          <div className="relative flex items-center gap-4">
            <NotificationBell />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsInboxOpen(true)}
              className="relative bg-gold/20 text-gold px-6 py-3 rounded-xl hover:bg-gold/30 transition-all flex items-center gap-3 group"
            >
              <i className="fas fa-inbox text-lg"></i>
              <span className="font-medium">Inbox</span>
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="bg-red-500/10 text-red-400 p-6 rounded-xl shadow-elegant backdrop-blur-sm border border-red-500/20">
          {error}
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Approved Events",
                value: stats.approvedEvents,
                color: "text-gold",
                bgColor: "bg-gold/10",
                borderColor: "border-gold/20",
                icon: "fa-check-circle"
              },
              {
                title: "Pending Requests",
                value: stats.pendingRequests,
                color: "text-mint",
                bgColor: "bg-mint/10",
                borderColor: "border-mint/20",
                icon: "fa-clock"
              },
              {
                title: "Denied Requests",
                value: stats.deniedRequests,
                color: "text-red-400",
                bgColor: "bg-red-400/10",
                borderColor: "border-red-400/20",
                icon: "fa-times-circle"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`${stat.bgColor} backdrop-blur-md p-8 rounded-2xl shadow-elegant border ${stat.borderColor} transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <i className={`fas ${stat.icon} ${stat.color} text-2xl`}></i>
                  <div>
                    <h3 className="text-ivory/80 font-medium">{stat.title}</h3>
                    <p className={`text-4xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Events Section */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-elegant p-8 border border-white/10">
            <div className="flex gap-6 mb-8">
              {["approved", "pending", "denied"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(status)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === status
                      ? "bg-gold text-midnight"
                      : "bg-white/5 text-ivory/60 hover:bg-white/10"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Event List with Inline Messaging */}
            <div className="space-y-4">
              {events[activeTab]?.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-ivory/90">{event.title}</h3>
                      <p className="text-ivory/60 mt-1">{event.description}</p>

                      {/* Message Preview */}
                      {event.messages?.length > 0 && (
                        <div className="mt-4 bg-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-ivory/70">Recent Messages</span>
                            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                              {event.messages.length}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {event.messages.slice(0, 1).map((message) => (
                              <div key={message.id} className="text-sm text-ivory/80">
                                {message.content.slice(0, 100)}...
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      {activeTab === "pending" ? (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleStatusUpdate(event.id, "approved")}
                            className="bg-mint/20 hover:bg-mint/30 text-mint px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 group"
                          >
                            <i className="fas fa-check text-sm group-hover:scale-110 transition-transform"></i>
                            <span>Approve</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowDenyForm(event.id)}
                            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 group"
                          >
                            <i className="fas fa-times text-sm group-hover:scale-110 transition-transform"></i>
                            <span>Deny</span>
                          </motion.button>
                        </>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedEvent(event.id);
                            handleMessageSubmit(event.id, "");
                          }}
                          className="bg-gold/20 hover:bg-gold/30 text-gold px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 group"
                        >
                          <i className="fas fa-comment text-sm group-hover:scale-110 transition-transform"></i>
                          <span>Message</span>
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Deny Form */}
                  <AnimatePresence>
                    {showDenyForm === event.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <textarea
                          placeholder="Reason for denial (optional)"
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-ivory/90 placeholder:text-ivory/40 focus:outline-none focus:border-gold/50"
                          value={denyReason}
                          onChange={(e) => setDenyReason(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              handleStatusUpdate(event.id, "denied", denyReason);
                              setShowDenyForm(null);
                              setDenyReason("");
                            }}
                            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            Confirm
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowDenyForm(null)}
                            className="bg-white/5 text-ivory/60 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
                          >
                            Cancel
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Inbox Modal */}
      <AnimatePresence>
        {isInboxOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-midnight/50 backdrop-blur-sm cursor-pointer"
              onClick={() => setIsInboxOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-[480px] bg-white shadow-elegant overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Inbox</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowNewMessageForm(true)}
                      className="bg-gold text-white px-3 py-1 rounded-lg hover:bg-gold/90 transition-colors text-sm"
                    >
                      <i className="fas fa-plus mr-1"></i>
                      New Message
                    </button>
                    <button
                      onClick={() => setIsInboxOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                {showNewMessageForm && (
                  <MessageHandler
                    onSubmit={handleNewMessageSubmit}
                    onCancel={() => setShowNewMessageForm(false)}
                    type="new"
                    events={events.approved}
                  />
                )}
                <MessageFilters
                  onFilterChange={setMessageFilter}
                  onSearch={setSearchTerm}
                  onSort={setSortType}
                  currentFilter={messageFilter}
                  searchTerm={searchTerm}
                  currentSort={sortType}
                />
                <div className="space-y-4 mt-4">
                  {filteredMessages.map((message) => (
                    <MessageThread
                      key={message.id}
                      message={message}
                      onReply={(id) => setShowReplyForm(id)}
                      onDelete={handleDeleteMessage}
                      onEdit={handleEditMessage}
                      onStatusChange={handleMessageStatusChange}
                      onExpandThread={async (threadId) => {
                        const msgs = await fetchThreadMessages(threadId);
                        setThreadMessages((prev) => ({ ...prev, [threadId]: msgs }));
                      }}
                      threadMessages={threadMessages[message.id] || []}
                      onViewThread={() => {
                        setSelectedThreadMessage(message);
                        setShowThreadModal(true);
                      }}
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
          </>
        )}
      </AnimatePresence>

      {/* Notification System */}
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
              onClose={() => setNotification({ show: false, message: '' })}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Pattern */}
      <div className="fixed inset-0 bg-pattern-dots bg-dots-sm opacity-5 pointer-events-none" />

      {showThreadModal && selectedThreadMessage && (
        <MessageThreadModal
          isOpen={showThreadModal}
          onClose={() => setShowThreadModal(false)}
          message={selectedThreadMessage}
          threadMessages={threadMessages[selectedThreadMessage.id] || []}
          onReply={handleReplySubmit}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
