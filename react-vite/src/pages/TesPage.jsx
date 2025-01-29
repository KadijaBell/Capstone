
import EventCard from "../components/EventCard/EventCard";
import MetricSummary from "../components/Metrics/Metrics";
import { CheckCircle, Hourglass, XCircle } from "lucide-react"; 

function TestPage() {
  const mockEvents = [
    {
      title: "Community Event 1",
      date: "January 30, 2025",
      description: "This is a community event focused on cultural engagement.",
      status: "Approved",
    },
    {
      title: "Community Event 2",
      date: "February 5, 2025",
      description: "A local event to support small businesses.",
      status: "Pending",
    },
    {
      title: "Community Event 3",
      date: "February 10, 2025",
      description: "A fundraising event for the arts.",
      status: "Denied",
    },
  ];

  const mockMetrics = [
    { title: "Approved Events", value: 10, icon: <CheckCircle className="text-green-500" /> },
    { title: "Pending Requests", value: 5, icon: <Hourglass className="text-yellow-500" /> },
    { title: "Denied Requests", value: 2, icon: <XCircle className="text-red-500" /> },
  ];

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Test Components</h1>

      {/* MetricSummary Testing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockMetrics.map((metric, index) => (
          <MetricSummary
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* EventCard Testing */}
      <div className="space-y-4">
        {mockEvents.map((event, index) => (
          <EventCard
            key={index}
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

export default TestPage;
