
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

function AdminDashboardPage() {

    return (
      <div>
        <h1>Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AdminDashboard />
        </div>
      </div>
    );
  }
export default AdminDashboardPage;

