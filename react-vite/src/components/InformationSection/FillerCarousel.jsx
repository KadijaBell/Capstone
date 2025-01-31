import { motion } from "framer-motion";

function FillerCarousel() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    offscreen: {
      y: 20,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.8
      }
    }
  };

  const hoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Data
  const services = [
    {
      title: "Celebrity Engagement",
      description: "Building authentic connections with audiences through strategic partnerships."
    },
    {
      title: "Community Activation",
      description: "Creating lasting consumer loyalty through meaningful engagement strategies."
    },
    {
      title: "Data-Driven Insights",
      description: "Delivering accurate consumer engagement reports for informed decision making."
    }
  ];

  const testimonials = [
    {
      quote: "Calif Pierre made our dream event a reality!",
      author: "Sarah & James"
    },
    {
      quote: "Professional and attentive team with top-notch services and really cares about the community.",
      author: "Emily T."
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-b from-midnight/5 via-midnight/10 to-midnight/5"
    >
      {/* About Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-midnight"
          whileHover={{ scale: 1.02 }}
        >
          Who We Are
          <div className="h-1 w-24 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={cardVariants}
        >
          <motion.div
            variants={hoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-lg cursor-pointer transform-gpu"
          >
            <h3 className="text-xl font-semibold mb-4 text-midnight">Our Mission</h3>
            <p className="text-charcoal/80">
              Calif Pierre is a solutions company focusing on Celebrity, Community,
              and Collection to create cultural impact.
            </p>
          </motion.div>

          <motion.div
            variants={hoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-lg cursor-pointer transform-gpu"
          >
            <h3 className="text-xl font-semibold mb-4 text-midnight">Our Approach</h3>
            <p className="text-charcoal/80">
              Unique activation concepts and data collection initiatives that drive real results.
            </p>
          </motion.div>

          <motion.div
            variants={hoverVariants}
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-lg cursor-pointer transform-gpu"
          >
            <h3 className="text-xl font-semibold mb-4 text-midnight">Our Focus</h3>
            <p className="text-charcoal/80">
              Creating sustainability in entertainment markets through innovative solutions.
            </p>
          </motion.div>
        </motion.div>

        {/* Services Section */}
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-midnight pt-16"
          whileHover={{ scale: 1.02 }}
        >
          Our Services
          <div className="h-1 w-24 bg-gold mx-auto mt-4 rounded-full"></div>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              whileHover="hover"
              variants={{
                ...cardVariants,
                hover: {
                  scale: 1.02,
                  borderColor: 'rgba(203, 161, 53, 0.4)',
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }
                }
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-midnight/90 backdrop-blur-sm border border-gold/20 rounded-lg p-8 text-ivory cursor-pointer transform-gpu"
            >
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-ivory/80">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div className="mt-24">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-midnight"
            whileHover={{ scale: 1.02 }}
          >
            What Our Clients Say
            <div className="h-1 w-24 bg-gold mx-auto mt-4 rounded-full"></div>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.blockquote
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                whileHover="hover"
                variants={{
                  ...cardVariants,
                  hover: {
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-lg cursor-pointer transform-gpu"
              >
                <p className="text-charcoal/80 italic">&quot;{testimonial.quote}&quot;</p>
                <footer className="mt-4 text-midnight font-semibold">- {testimonial.author}</footer>
              </motion.blockquote>
            ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default FillerCarousel;
