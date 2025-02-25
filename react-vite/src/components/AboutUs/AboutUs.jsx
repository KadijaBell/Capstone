import { motion } from "framer-motion";

const initiatives = [
  {
    title: "Celebrity",
    icon: "✧", // You can replace with custom SVG or icon component
    description: "Bridging the gap between talent and community",
    color: "from-gold via-blush to-gold"
  },
  {
    title: "Community",
    icon: "◈", // You can replace with custom SVG or icon component
    description: "Building lasting connections through entertainment",
    color: "from-mint via-gold to-mint"
  },
  {
    title: "Collection",
    icon: "❖", // You can replace with custom SVG or icon component
    description: "Curating experiences that resonate",
    color: "from-blush via-mint to-blush"
  }
];

const AboutUs = () => {
  return (
    <section className="py-24 bg-midnight relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute inset-0 bg-pattern-dots bg-dots-sm opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-gold/10 via-mint/10 to-blush/10 rounded-full blur-3xl"
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
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl font-bold bg-gradient-to-r from-gold via-gold/80 to-gold bg-clip-text text-transparent font-display"
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-ivory/90 leading-relaxed font-light tracking-wide"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="font-medium text-gold"
            >
              Calif Pierre
            </motion.span>{" "}
            is a solutions company that aims to partner a pincer strategy to create community
            impact through three clear initiatives:
          </motion.p>

          {/* Enhanced Initiatives Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${initiative.color} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <div className="relative bg-midnight/80 backdrop-blur-sm border border-gold/20 rounded-lg p-6 h-full transform group-hover:-translate-y-1 transition duration-300">
                  <motion.div
                    className={`text-3xl mb-4 bg-gradient-to-r ${initiative.color} bg-clip-text text-transparent`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {initiative.icon}
                  </motion.div>
                  <h3 className={`text-2xl font-display font-bold bg-gradient-to-r ${initiative.color} bg-clip-text text-transparent mb-3`}>
                    {initiative.title}
                  </h3>
                  <p className="text-ivory/80 text-sm font-light leading-relaxed">
                    {initiative.description}
                  </p>
                  <motion.div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${initiative.color} opacity-30`}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scaleX: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg text-ivory/80 leading-relaxed font-light"
          >
            The founders of this company, with over{" "}
            <span className="text-gold font-medium">25 years</span> combined in entertainment
            experience, has taken their knowledge of the business to approach solutions
            that would grant a cultural turn in the industry.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
