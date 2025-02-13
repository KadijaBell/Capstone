import { motion } from 'framer-motion';

function MetricCard({ title, value, icon, color }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`${color} p-6 rounded-xl shadow-elegant backdrop-blur-sm`}
        >
            <div className="flex items-center gap-4">
                <div className="text-2xl">{icon}</div>
                <div>
                    <h3 className="text-sm text-gray-600">{title}</h3>
                    <p className="text-2xl font-bold text-midnight">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default MetricCard;
