import { motion } from "framer-motion";

function Community() {
  return (
    <div className="w-full bg-gradient-to-b from-midnight to-charcoal py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 md:px-12 lg:px-5">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gold mb-4">Our Community</h2>
          <p className="text-ivory/80 text-lg max-w-2xl mx-auto">
            Join a thriving network of creators, innovators, and industry professionals. Together, we&apos;re building more than just connections - we&apos;re creating opportunities.
          </p>
        </motion.div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-midnight/50 p-6 rounded-lg border border-gold/10 hover:border-gold/30 transition-all"
          >
            <h3 className="text-gold text-xl font-semibold mb-3">Networking Events</h3>
            <p className="text-ivory/70">
              Regular meetups and events designed to foster meaningful connections within the industry.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-midnight/50 p-6 rounded-lg border border-gold/10 hover:border-gold/30 transition-all"
          >
            <h3 className="text-gold text-xl font-semibold mb-3">Mentorship Programs</h3>
            <p className="text-ivory/70">
              Connect with industry veterans and gain invaluable insights to accelerate your growth.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-midnight/50 p-6 rounded-lg border border-gold/10 hover:border-gold/30 transition-all"
          >
            <h3 className="text-gold text-xl font-semibold mb-3">Collaboration Hub</h3>
            <p className="text-ivory/70">
              A platform for creators to find partners, share resources, and launch joint ventures.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <button className="bg-gold text-midnight px-8 py-3 rounded-lg font-semibold hover:bg-ivory transition-colors duration-300">
            Join Our Community
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Community;
