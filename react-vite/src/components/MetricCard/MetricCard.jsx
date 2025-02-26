import { motion } from 'framer-motion';

function MetricCard({ title, value, icon, onClick, className }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`${className} p-6 rounded-xl border border-gold/10
                       transition-all duration-300 group cursor-pointer
                       hover:shadow-elegant relative overflow-hidden`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/10" />
            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{icon}</span>
                    <span className="text-4xl font-bold text-midnight dark:text-ivory">
                        {value}
                    </span>
                </div>
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {title}
                </h3>
            </div>
        </motion.button>
    );
}

export default MetricCard;
