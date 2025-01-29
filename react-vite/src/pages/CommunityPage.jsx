import EventCard from "../components/EventCard/EventCard";
import { useState, useEffect } from "react";
import { fetchAPI } from "../utils/api";

function CommunityPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchAPI("/api/community/events");
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching community data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Community Events</h1>
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            date={event.date}
            description={event.description}
            status={event.status}
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
