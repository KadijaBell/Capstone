import { motion } from "framer-motion";
import EventCard from "../../components/EventCard/EventCard";
import { useState, useEffect } from "react";
import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ParticleBackground from '../../components/Backgrounds/ParticleBackground';

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAPI("/api/events/public");
        if (response && response.events) {
          setEvents(response.events);
        } else {
          throw new Error('Invalid response format');
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

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <ParticleBackground>
      <div className="py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-midnight mb-8">All Events</h1>

          {events.length === 0 ? (
            <p className="text-center text-charcoal/60">No events found</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </ParticleBackground>
  );
}

export default EventsPage;
