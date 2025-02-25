//import { motion } from 'framer-motion';
//import { FaClock, FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa';
import MetricCard from '../MetricCard/MetricCard';
//import { motion } from 'framer-motion';

function DashboardOverview({ stats, onTabChange }) {
    //const handleTabClick = (tab) => {
    //    onTabChange(tab);

    //     setTimeout(() => {
    //         const section = document.getElementById(`${tab}-section`);
    //         if (section) {
    //             section.scrollIntoView({ behavior: 'smooth' });
    //         }
    //     }, 100);
    // };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
                title="Pending Events"
                value={stats.pendingEvents || 0}
                icon="🕒"
                onClick={() => onTabChange('pending')}
                className="bg-amber-50 dark:bg-amber-900/20"
            />
            <MetricCard
                title="Approved Events"
                value={stats.approvedEvents || 0}
                icon="✅"
                onClick={() => onTabChange('approved')}
                className="bg-green-50 dark:bg-green-900/20"
            />
            <MetricCard
                title="Denied Requests"
                value={stats.deniedRequests || 0}
                icon="❌"
                onClick={() => onTabChange('denied')}
                className="bg-red-50 dark:bg-red-900/20"
            />
            <MetricCard
                title="Unread Messages"
                value={stats.unreadMessages || 0}
                icon="📬"
                onClick={() => onTabChange('messages')}
                className="bg-blue-50 dark:bg-blue-900/20"
            />
        </div>
    );
}

export default DashboardOverview;
