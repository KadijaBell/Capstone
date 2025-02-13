import { motion } from "framer-motion";
import EventCard from "../components/EventCard/EventCard";
import EventServiceRequestForm from "../components/EventRequestForm/EventServiceRequestForm";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function CommunityPage() {
  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/events/public", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      if (data && data.events) {
        setEvents(data.events);
      } else {
        throw new Error("No events data received");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventSubmit = async (formData) => {
    try {
      console.log('Submitting form data:', formData);

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit event');
      }

      const data = await response.json();
      console.log('Success response:', data);

      setShowEventForm(false);
      fetchEvents();
      alert('Event submitted successfully!');
    } catch (error) {
      console.error("Error submitting event:", error);
      alert(error.message || "Failed to submit event. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="h-screen"> <LoadingSpinner /> </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      {/* Vision Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        <motion.h1
          className="text-4xl font-bold text-midnight mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          Building Community Through Innovation
        </motion.h1>
        <motion.p
          className="text-lg text-charcoal/80 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Talent discovery is dear to our vision. Whether we&apos;re discovering new players,
          artists/entertainers, influencers, or potential candidates to work in the industry,
          we&apos;re dedicated to making sure our impact builds trust with the community, and does
          so in a way that creates equity.
        </motion.p>
      </section>

      {/* Featured Events Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-midnight">Featured Events</h2>
          <div className="flex gap-4">
            <Link
              to="/public"
              className="bg-midnight text-ivory px-6 py-2 rounded-lg hover:bg-midnight/90 transition"
            >
              View All Events
            </Link>
            <button
              onClick={() => setShowEventForm(true)}
              className="bg-gold text-midnight px-6 py-2 rounded-lg hover:bg-ivory transition"
            >
              Request Our Services
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              No events available at this time
            </div>
          )}
        </div>
      </section>

      {/* Services Section  */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-midnight mb-8">What We Deliver</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-midnight/5 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gold mb-4">Portfolio Creation</h3>
            <p className="text-charcoal/80">
              Artist profiles, company portfolios, and influencer portfolio development
            </p>
          </div>
          <div className="bg-midnight/5 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gold mb-4">Event & Community</h3>
            <p className="text-charcoal/80">
              Event concept creation, activation, and community impact strategies for entertainment relationships
            </p>
          </div>
          <div className="bg-midnight/5 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gold mb-4">Data Innovation</h3>
            <p className="text-charcoal/80">
              Comprehensive data collection and analysis for consumer engagement, needs, and interests
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="bg-midnight/5 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-midnight mb-6">Our Focus</h2>
        <p className="text-charcoal/80 mb-8">
          We create sustainable markets in the video game industry by leveraging celebrity engagement
          to build consumer loyalty beyond transactional relationships. Our approach focuses on
          creating lasting connections that drive both profitability and equity among audiences.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gold mb-4">Education & Licensing</h3>
            <p className="text-charcoal/80">
              From licensing education to partnering influencers with our celebrity portfolio,
              we provide pathways to success in the entertainment industry.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gold mb-4">Global Impact</h3>
            <p className="text-charcoal/80">
              We&apos;re launching conferences and initiatives to spark global conversations
              about community building and talent development.
            </p>
          </div>
        </div>
      </section>

      {/* Event Request Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <EventServiceRequestForm
            onSubmit={handleEventSubmit}
            onClose={() => setShowEventForm(false)}
          />
        </div>
      )}
    </motion.div>
  );
}

export default CommunityPage;
