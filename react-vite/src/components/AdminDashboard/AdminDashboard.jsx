import { useState, useEffect } from "react";
import MetricSummary from "../Metrics/Metrics";
import EventCard from "../EventCard/EventCard";
import { fetchAPI } from "../../utils/api";

function AdminDashboard() {
    const [metrics, setMetrics] = useState(null);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const response = await fetchAPI("/api/admin/dashboard");
            setMetrics({
                approved: response.dashboard_data.total_events,
                pending: response.dashboard_data.pending_events,
                denied: response.dashboard_data.denied_events,
            });
            setEvents(response.pending_events || []); 
        } catch (error) {
            console.error("Error fetching admin data:", error.message);
            setError("Failed to load dashboard data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleEventUpdate = () => {
        fetchDashboardData();
    };

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {metrics && (
                    <>
                        <MetricSummary
                            title="Approved Events"
                            value={metrics.approved}
                            icon={<div>✅</div>}
                        />
                        <MetricSummary
                            title="Pending Requests"
                            value={metrics.pending}
                            icon={<div>⏳</div>}
                        />
                        <MetricSummary
                            title="Denied Requests"
                            value={metrics.denied}
                            icon={<div>❌</div>}
                        />
                    </>
                )}
            </div>

            {/* Events Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">Pending Event Requests</h2>
                {isLoading && <p>Loading events...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!isLoading && !error && events.length === 0 && (
                    <p>No pending events found</p>
                )}
                {!isLoading && !error && events.map((event) => (
                    <EventCard
                        key={event.id}
                        id={event.id}
                        title={event.title}
                        date={event.date}
                        description={event.description}
                        status={event.status}
                        type={event.type}
                        onUpdate={handleEventUpdate}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
