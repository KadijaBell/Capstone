import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Agencies = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-pattern-dots bg-dots-sm opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-gold/10 via-mint/10 to-blush/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Content Card */}
          <div className="backdrop-blur-sm border border-gold/20 rounded-2xl p-8 md:p-12 bg-ivory/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <div className="max-w-xl space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold via-mint to-blush bg-clip-text text-transparent"
                >
                  Ready to Elevate Your Brand?
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-xl text-ivory/90">
                    Let&apos;s transform your vision into reality
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Custom Brand Strategy",
                      "Community Building",
                      "Data-Driven Insights",
                      "Entertainment Industry Expertise"
                    ].map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                        className="flex items-center gap-3 text-ivory/80"
                      >
                        <span className="text-gold">✦</span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center gap-6 "
              >
                <div className="relative group">
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-gold via-mint to-blush rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/agency-page")}
                    className="relative px-8 py-4 bg-midnight text-gold font-medium rounded-lg border border-gold/20 hover:text-ivory transition-colors duration-300"
                  >
                    Get Started Now
                  </motion.button>
                </div>
                <p className="text-ivory/60 text-sm">
                  Join the future of entertainment
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Agencies;
