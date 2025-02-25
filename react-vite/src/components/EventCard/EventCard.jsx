import { motion } from "framer-motion";
import { fetchAPI } from "../../utils/api";
//import { useState } from 'react';
import { formatDate } from '../../utils/dateUtils';

function EventCard({ event, onAction }) {
  const handleAction = (action, data = null) => {
    if (onAction) {
      onAction(action, data);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await fetchAPI(`/api/events/${event.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      handleAction('statusChange', newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 dark:bg-midnight/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant"
    >
      <h3 className="text-xl font-semibold text-midnight dark:text-ivory mb-2">
        {event.title}
      </h3>
      {event.organization && (
        <p className="text-gold mb-2">{event.organization}</p>
      )}
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {event.description}
      </p>
      {event.date && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {formatDate(event.date)}
        </p>
      )}

      <div className="space-y-4">
        <div className="flex justify-end gap-2">
          {event.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusChange('approved')}
                className="px-4 py-1.5 text-sm rounded-lg bg-green-500
                         text-white hover:bg-green-600 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange('denied')}
                className="px-4 py-1.5 text-sm rounded-lg bg-red-500
                         text-white hover:bg-red-600 transition-colors"
              >
                Deny
              </button>
            </>
          )}
          <button
            onClick={() => handleAction('view')}
            className="px-4 py-1.5 text-sm rounded-lg bg-midnight/90
                     dark:bg-gold/90 text-ivory hover:bg-midnight/80
                     dark:hover:bg-gold/80 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default EventCard;
