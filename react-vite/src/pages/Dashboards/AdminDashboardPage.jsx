import { useEffect, useState } from "react";
import axios from "axios";
// import { motion } from "framer-motion";



function AdminDashboardPage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      async function fetchRequests() {
        try {
          const response = await axios.get("/api/admin/events");
          setRequests(response.data.events);
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      }

      fetchRequests();
    }, []);

    return (
      <div>
        <h2>Admin Dashboard</h2>
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <h3>{req.title}</h3>
              <p>{req.description}</p>
              <button>Approve</button>
              <button>Deny</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
export default AdminDashboardPage
