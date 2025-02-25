import { motion } from 'framer-motion';
import EventCard from './EventCard';

function EventManagement({ events = [], onEventAction, title }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 dark:bg-midnight/90 backdrop-blur-sm rounded-xl p-6 shadow-elegant"
        >
            <h2 className="text-2xl font-bold mb-4 text-midnight dark:text-ivory">{title}</h2>

            {(!events || events.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No events to display</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {events.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onAction={(action, data) => onEventAction(event.id, action, data)}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default EventManagement;
