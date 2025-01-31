import { motion } from "framer-motion";
import { fetchAPI } from "../../utils/api";

function EventCard({ event, onStatusChange }) {

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApprove = async () => {
    try {
      await fetchAPI(`/api/admin/events/${event.id}/approve`, { method: "PATCH" });
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error("Error approving event:", error.message);
    }
  };

  const handleReject = async () => {
    try {
      await fetchAPI(`/api/admin/events/${event.id}/reject`, { method: "PATCH" });
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error("Error rejecting event:", error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-elegant"
    >
      {event?.image && (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-gold font-medium mb-2">
          {formatDate(event?.created_at)}
        </div>
        <h3 className="text-xl font-bold text-midnight mb-3">{event?.title}</h3>
        <p className="text-charcoal/80 mb-4">{event?.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-charcoal/60">{event?.location}</span>
          <button className="bg-gold text-midnight px-4 py-2 rounded-lg hover:bg-ivory transition">
            Learn More
          </button>
        </div>
        {event?.status === "pending" && (
          <div className="mt-4 space-x-2">
            <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Approve
            </button>
            <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Reject
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default EventCard;
