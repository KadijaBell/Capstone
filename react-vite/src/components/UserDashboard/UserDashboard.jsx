import { useState, useEffect } from "react";
import MetricSummary from "../Metrics/Metrics";
import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../LoadingSpinner";

function UserDashboard() {
    const [metrics, setMetrics] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState(false);
    const [showContactDrawer, setShowContactDrawer] = useState(false);
    const [generalMessage, setGeneralMessage] = useState('');
    const [newFormRequest, setNewFormRequest] = useState({
        title: '',
        description: '',
        organization: '',
        serviceType: 'other',
        date: '',
        location: ''
    });

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
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting form data:', newFormRequest);

        try {
            const response = await fetchAPI("/api/events/", {
                method: "POST",
                body: JSON.stringify({
                    title: newFormRequest.title,
                    description: newFormRequest.description,
                    organization: newFormRequest.organization,
                    type: newFormRequest.serviceType,
                    date: newFormRequest.date,
                    location: newFormRequest.location,
                    status: 'pending'
                })
            });



            if (response) {
                setForm(false);
                setNewFormRequest({
                    title: '',
                    description: '',
                    organization: '',
                    serviceType: 'other',
                    date: '',
                    location: ''
                });
                fetchUserData();
                alert("Event submitted successfully!");
            }
        } catch (error) {
            console.error("Error submitting event:", error);
            alert("Failed to submit event");
        }
    };

    const handleGeneralContactAdmin = async () => {
        try {
            await fetchAPI("/api/users/contact-admin", {
                method: "POST",
                body: JSON.stringify({
                    message: generalMessage
                })
            });
            setGeneralMessage(""); // Clear message
            setShowContactDrawer(false); // Close drawer
            alert("Message sent successfully to admin");
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message");
        }
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Events Dashboard</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => setShowContactDrawer(true)}
                        className="bg-midnight text-gold px-4 py-2 rounded-lg hover:bg-navy transition"
                    >
                        Contact Admin
                    </button>
                    <button
                        onClick={() => setForm(true)}
                        className="bg-gold text-midnight px-4 py-2 rounded-lg hover:bg-ivory transition"
                    >
                        Submit Service Request
                    </button>
                </div>
            </div>

            {/*  Contact Admin Drawer */}
            {showContactDrawer && (
                <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
                    <div className="bg-white w-full max-w-md h-full p-6 shadow-lg overflow-y-auto animate-slide-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Contact Administration</h2>
                            <button
                                onClick={() => setShowContactDrawer(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <span className="text-2xl">×</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleGeneralContactAdmin();
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    value={generalMessage}
                                    onChange={(e) => setGeneralMessage(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gold"
                                    rows="6"
                                    placeholder="How can we help you?"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-midnight text-gold py-2 rounded-lg hover:bg-navy transition"
                                disabled={!generalMessage.trim()}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Event Submission Modal */}
            {form && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Submit Request </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={newFormRequest.title}
                                    onChange={(e) => setNewFormRequest({...newFormRequest, title: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Organization</label>
                                <input
                                    type="text"
                                    value={newFormRequest.organization}
                                    onChange={(e) => setNewFormRequest({...newFormRequest, organization: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">
                                Service Type
                                </label>
                                <select
                                required
                                className="w-full px-4 py-2 border rounded-lg"
                                value={newFormRequest.serviceType}
                                onChange={(e) => setNewFormRequest({...newFormRequest, serviceType: e.target.value})}
                                        >
                                <option value="portfolio">Portfolio Creation</option>
                                <option value="community">Event & Community</option>
                                <option value="data">Data Innovation</option>
                                <option value="influencer">Influencer Agency</option>
                                <option value="celebrity">Celebrity Agency</option>
                                <option value="other">Other</option>
                                </select>
                        </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={newFormRequest.description}
                                    onChange={(e) => setNewFormRequest({...newFormRequest, description: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    value={newFormRequest.date}
                                    onChange={(e) => setNewFormRequest({...newFormRequest, date: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    value={newFormRequest.location}
                                    onChange={(e) => setNewFormRequest({...newFormRequest, location: e.target.value})}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setForm(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gold text-midnight px-4 py-2 rounded hover:bg-ivory"
                                >
                                    Submit Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                {isLoading && <div className="h-screen"> <LoadingSpinner /> </div>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && events.length === 0 && (
                    <p>No submissions found</p>
                )}
                <div className="space-y-4">
                    {!isLoading && !error && events.map((event) => (
                        <div key={event.id} className="bg-white rounded-lg shadow-md p-6 transition hover:shadow-lg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{event.title}</h3>
                                    <p className={`text-sm ${getStatusColor(event.status)}`}>
                                        Status: {event.status}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-4">{event.description}</p>

                            {/* Pending Event Contact Form */}
                            {event.status === 'pending' && (
                                <div className="mt-4 border-t pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-lg font-semibold">Contact Admin About This Event</h4>
                                        <span className="text-xs text-gray-500">Pending Review</span>
                                    </div>
                                    <textarea
                                        className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-gold transition"
                                        rows="3"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Questions about this pending event?"
                                    />
                                    <button
                                        onClick={() => handleContactAdmin(event.id)}
                                        className="bg-midnight text-gold px-4 py-2 rounded-lg hover:bg-navy transition disabled:opacity-50"
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
