import { motion } from "framer-motion";
import EventCard from "../components/EventCard/EventCard";
import { useState, useEffect } from "react";
import { fetchAPI } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAPI("/api/events/public-approved");
        if (response && response.events) {
          setEvents(response.events);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-midnight mb-8">All Events</h1>

      {isLoading && (
        <div className="h-screen">
        <LoadingSpinner />
      </div>
      )}

      {error && (
        <div className="text-red-500 text-center py-8">
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-8">
          <p>No events found</p>
        </div>
      )}

      {!isLoading && !error && events.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default EventsPage;
