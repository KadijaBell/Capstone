import { motion } from "framer-motion";

function FillerCarousel() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
     }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About Section */}
      <motion.section
        className="py-16 px-6"
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          Who We Are
        </motion.h2>
        <motion.h2
          className="text-lg text-center leading-relaxed mb-6"
          variants={sectionVariants}
        >
          Calif Pierre is a solutions company focusing on Celebrity, Community,
          and Collection to create cultural impact.
        </motion.h2>
        <motion.ul
          className="list-disc pl-6 space-y-2 text-center"
          variants={sectionVariants}
        >
          <li>Unique activation concepts and data collection initiatives.</li>
          <li>
            Services include artist portfolio creation, influencer branding,
            event activation, and community impact strategies.
          </li>
          <li>
            Focused on creating sustainability in entertainment markets,
            especially video games.
          </li>
        </motion.ul>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-6 bg-mutedCharcoal text-ivoryWhite"
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-mintGreen p-6 rounded shadow-md text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-bold mb-2">Celebrity Engagement</h3>
            <p>Building authentic connections with audiences.</p>
          </motion.div>
          <motion.div
            className="bg-gold p-6 rounded shadow-md text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-bold mb-2">Community Activation</h3>
            <p>Strategies that create long-lasting consumer loyalty.</p>
          </motion.div>
          <motion.div
            className="bg-blushPink p-6 rounded shadow-md text-center"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-bold mb-2">Data-Driven Insights</h3>
            <p>Accurate consumer engagement reports for brands.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 px-6"
        variants={sectionVariants}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          What Our Clients Say
        </motion.h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <motion.blockquote
            className="bg-midnightBlue text-ivoryWhite p-6 rounded shadow-md max-w-sm"
            variants={cardVariants}
            whileHover="hover"
          >
            <p>&quot;Calif Pierre made our dream event a reality!&quot; - Sarah & James</p>
          </motion.blockquote>
          <motion.blockquote
            className="bg-midnightBlue text-ivoryWhite p-6 rounded shadow-md max-w-sm"
            variants={cardVariants}
            whileHover="hover"
          >
            <p>&quot;Professional and attentive team with top-notch services and really cares about the community.&quot; - Emily T.</p>
          </motion.blockquote>
        </div>
      </motion.section>
    </motion.div>
  );
}

export default FillerCarousel;
