import { motion } from "framer-motion";
import ParticleBackground from '../components/Backgrounds/ParticleBackground';

function InsightsPage() {
  return (
    <ParticleBackground>
      <div className="py-16 px-6 sm:px-8 lg:px-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-midnight mb-4">Insights</h1>
          <p className="text-lg text-charcoal/80">
            Stay ahead with the latest trends, research, and analysis from industry experts.
          </p>

          {/* Analytics Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <motion.div className="bg-white/80 p-6 rounded-xl text-center shadow-elegant" whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-gold">87%</h3>
              <p>Engagement Rate</p>
            </motion.div>
            <motion.div className="bg-white/80 p-6 rounded-xl text-center shadow-elegant" whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-gold">2M+</h3>
              <p>Monthly Users</p>
            </motion.div>
            <motion.div className="bg-white/80 p-6 rounded-xl text-center shadow-elegant" whileHover={{ scale: 1.05 }}>
              <h3 className="text-4xl font-bold text-gold">4.9</h3>
              <p>User Rating</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </ParticleBackground>
  );
}

export default InsightsPage;
