import { useState, useEffect } from "react";
import MetricSummary from "../Metrics/Metrics";
import { fetchAPI } from "../../utils/api";

function UserDashboard() {
    const [metrics, setMetrics] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const fetchUserData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            console.log("Fetching dashboard data...");
            const response = await fetchAPI("/api/events/dashboard");
            console.log("Dashboard response:", response);

            if (!response || response.error) {
                throw new Error(response.error || "Failed to load api data");
            }

            setMetrics({
                total: response.dashboard_data.total_events,
                pending: response.dashboard_data.pending_events,
                approved: response.dashboard_data.approved_events,
                rejected: response.dashboard_data.rejected_events
            });
            setEvents(response.events || []);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError(error.message || "Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleContactAdmin = async (eventId) => {
        try {
            await fetchAPI("/api/users/contact-admin", {
                method: "POST",
                body: JSON.stringify({
                    event_id: eventId,
                    message: message
                })
            });
            setMessage(""); // Clear message after sending
            alert("Message sent successfully to admin");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-600';
            case 'pending': return 'text-yellow-600';
            case 'rejected': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">My Events Dashboard</h1>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics && (
                    <>
                        <MetricSummary
                            title="Total Submissions"
                            value={metrics.total}
                            icon={<div>📝</div>}
                        />
                        <MetricSummary
                            title="Pending Review"
                            value={metrics.pending}
                            icon={<div>⏳</div>}
                        />
                        <MetricSummary
                            title="Approved Events"
                            value={metrics.approved}
                            icon={<div>✅</div>}
                        />
                        <MetricSummary
                            title="Rejected Events"
                            value={metrics.rejected}
                            icon={<div>❌</div>}
                        />
                    </>
                )}
            </div>

            {/* Events Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">My Event Submissions</h2>
                {isLoading && <p>Loading events...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && events.length === 0 && (
                    <p>No submissions found</p>
                )}
                <div className="space-y-4">
                    {!isLoading && !error && events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                    <p className={`text-sm ${getStatusColor(event.status)}`}>
                                        Status: {event.status}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{event.description}</p>

                            {/* Contact Admin Form */}
                            {event.status === 'pending' && (
                                <div className="mt-4 border-t pt-4">
                                    <h4 className="text-lg font-semibold mb-2">Contact Admin</h4>
                                    <textarea
                                        className="w-full p-2 border rounded-lg mb-2"
                                        rows="3"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your message to admin..."
                                    />
                                    <button
                                        onClick={() => handleContactAdmin(event.id)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        disabled={!message.trim()}
                                    >
                                        Send Message
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
