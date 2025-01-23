import { User } from '../../store/session';

function UserDashboardPage() {
    return (
        <div>
            <p>Welcome, {User.username}</p>
            <h1>User Dashboard</h1>
        </div>
    );
}

export default UserDashboardPage
