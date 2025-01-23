import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function DashboardPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/api/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="dashboard-page">
      <h2 className="text-3xl font-semibold mb-6">My Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <motion.li
            key={event.id}
            className="p-4 bg-white shadow rounded"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">Status: {event.status}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}


export default DashboardPage;
