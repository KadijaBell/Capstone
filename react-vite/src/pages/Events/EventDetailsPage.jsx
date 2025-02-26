import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchAPI } from "../../utils/api";
import LoadingSpinner from "../../components/LoadingSpinner";
import ParticleBackground from '../../components/Backgrounds/ParticleBackground';

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching event with ID:", id);
        const response = await fetchAPI(`/api/events/${id}`);
        console.log("Response:", response);
        if (response && response.event) {
          setEvent(response.event);
        } else {
          throw new Error('Event not found');
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError(error.message || "Failed to load event details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 py-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          {event && (
            <div className="bg-white rounded-lg shadow-elegant p-6">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-midnight mb-2">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-charcoal/60">
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.location}
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    {event.organization}
                  </p>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold text-midnight mb-4">
                  Description
                </h2>
                <p className="text-charcoal/80 whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-2xl font-semibold text-midnight mb-4">
                  Event Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-midnight mb-2">Event Type</h3>
                    <p className="text-charcoal/80">{event.type}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-midnight mb-2">Status</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        event.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : event.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </ParticleBackground>
  );
}

export default EventDetailsPage;
