import { motion } from "framer-motion";
import { fetchAPI } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useNotifications } from '../../hooks/useNotifications';
import { useState } from 'react';

function EventCard({ event, onStatusChange, isAdmin }) {
  const navigate = useNavigate();
  const { sendNotification } = useNotifications();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [message, setMessage] = useState('');

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await fetchAPI(`/api/events/${event.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      onStatusChange();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleMessageSubmit = async () => {
    try {
      await fetchAPI(`/api/events/${event.id}/message`, {
        method: 'POST',
        body: JSON.stringify({
          message,
          recipientId: isAdmin ? event.userId : event.adminId
        })
      });
      setMessage('');
      setShowMessageForm(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLearnMore = () => {
    console.log("Navigating to event:", event.id);
    navigate(`/events/${event.id}`);
  };

  const handleMessageAdmin = async () => {
    await sendNotification(
      1, // Admin user ID
      `New message regarding event: ${event.title}`,
      event.id
    );
    // Show success message to user
    alert('Message sent to admin successfully');
  };

  const renderActionButtons = () => {
    if (event.status === 'pending' || event.status === 'rejected') {
      return (
        <button
          onClick={() => handleMessageAdmin()}
          className="mt-4 bg-gold text-midnight px-4 py-2 rounded hover:bg-gold/90 transition"
        >
          Message Admin
        </button>
      );
    }
    return null;
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
          <button
            onClick={handleLearnMore}
            className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
          >
            Learn More
          </button>
        </div>
        {isAdmin ? (
          <div className="space-y-4">
            {event.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusChange('approved')}
                  className="bg-mint text-midnight px-4 py-2 rounded-lg hover:bg-mint/80"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange('denied')}
                  className="bg-blush text-midnight px-4 py-2 rounded-lg hover:bg-blush/80"
                >
                  Deny
                </button>
              </div>
            )}
            <button
              onClick={() => setShowMessageForm(!showMessageForm)}
              className="bg-gold text-midnight px-4 py-2 rounded-lg hover:bg-gold/80"
            >
              Message Client
            </button>
          </div>
        ) : (
          renderActionButtons()
        )}

        {showMessageForm && (
          <div className="mt-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-mint"
              placeholder={`Message to ${isAdmin ? 'client' : 'admin'}...`}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowMessageForm(false)}
                className="text-charcoal hover:text-midnight"
              >
                Cancel
              </button>
              <button
                onClick={handleMessageSubmit}
                className="bg-mint text-midnight px-4 py-2 rounded-lg hover:bg-mint/80"
              >
                Send Message
              </button>
            </div>
          </div>
        )}
        {renderActionButtons()}
      </div>
    </motion.div>
  );
}

export default EventCard;
