 import { fetchAPI } from "../../utils/api";



function EventCard({ id, title, description, date, status, type, onUpdate }) {
    const handleApprove = async () => {
      try {
        await fetchAPI(`/api/admin/events/${id}/approve`, { method: "PATCH" });
        onUpdate();
      } catch (error) {
        console.error("Error approving event:", error.message);
      }
    };

    const handleReject = async () => {
      try {
        await fetchAPI(`/api/admin/events/${id}/reject`, { method: "PATCH" });
        onUpdate();
      } catch (error) {
        console.error("Error rejecting event:", error.message);
      }
    };

    return (
      <div className="border rounded-lg shadow-md p-4 bg-white">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-charcoal-700">{date}</p>
        <p className="text-sm text-gray-500">
          Type: {type} | Status: {status}
        </p>
        {status === "pending" && (
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
    );
  }

export default EventCard;
