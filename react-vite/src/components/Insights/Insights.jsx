import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
//import PixelCard from "../PixelCard/PixelCard";

const images = [
  "/assets/capstone-image-1.jpg",
  "/assets/capstone-image-2.jpg",
  "/assets/capstone-image-3.jpg",
  "/assets/capstone-image-4.jpg",
  "/assets/capstone-image-5.jpg",
  "/assets/capstone-image-6.jpg",
  "/assets/capstone-image-7.jpg",
  "/assets/capstone-image-8.jpg",
];

const metrics = [
  {
    value: "25+",
    title: "Years Experience",
    description: "Combined entertainment industry expertise",
    color: "from-gold via-blush to-gold"
  },
  {
    value: "50K+",
    title: "Community Reach",
    description: "Active engagement across platforms",
    color: "from-mint via-gold to-mint"
  },
  {
    value: "100%",
    title: "Data Accuracy",
    description: "Precision in analytics and reporting",
    color: "from-blush via-mint to-blush"
  },
  {
    value: "3x",
    title: "Growth Rate",
    description: "Average client platform expansion",
    color: "from-gold via-mint to-blush"
  }
];

const Insights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // toggle between the two text states continuously
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    // Background slideshow interval remains unchanged.
    const imageInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    // Toggle text every 8 seconds
    const textInterval = setInterval(() => {
      setShowData((prev) => !prev);
    }, 8000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Animation variants for header and paragraph with slightly longer durations.
  const headingVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    exit: { opacity: 0, y: -40, transition: { duration: 1, ease: "easeIn" } },
  };

  // const paragraphVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  //   },
  //   exit: { opacity: 0, y: -20, transition: { duration: 1, ease: "easeIn" } },
  // };

  return (
    <section id="insights" className="relative overflow-hidden min-h-screen">
      {/* Foreground content */}
      <motion.div
        className="relative z-10 py-24 bg-charcoal/95 backdrop-blur-sm"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 flex flex-col items-center">
          {/* Enhanced Text Container */}
          <div className="space-y-6 max-w-3xl mx-auto text-center">
            <motion.h2
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gold via-mint to-blush bg-clip-text text-transparent mb-8"
            >
              WHAT WE DELIVER
            </motion.h2>

            <AnimatePresence mode="wait">
              {!showData ? (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-ivory/90 leading-relaxed">
                    Our comprehensive service suite focuses on three key areas:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    <div className="p-4 bg-midnight/50 rounded-lg border border-gold/10">
                      <h3 className="text-gold font-semibold mb-2">Portfolio Creation</h3>
                      <p className="text-ivory/70 text-sm">Artist profiles, company branding, and influencer portfolio development</p>
                    </div>
                    <div className="p-4 bg-midnight/50 rounded-lg border border-gold/10">
                      <h3 className="text-mint font-semibold mb-2">Community Impact</h3>
                      <p className="text-ivory/70 text-sm">Strategic activation and relationship building in entertainment</p>
                    </div>
                    <div className="p-4 bg-midnight/50 rounded-lg border border-gold/10">
                      <h3 className="text-blush font-semibold mb-2">Data Collection</h3>
                      <p className="text-ivory/70 text-sm">Comprehensive analytics for consumer engagement and activity</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="data-initiative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-lg text-ivory/90 leading-relaxed">
                    Through our groundbreaking partnership with Billboard Magazine,
                    we&apos;re revolutionizing data collection in gaming communities.
                    Our initiative aims to establish Video Gaming as a recognized
                    category on Billboard charts, while introducing innovative
                    methods for live event data collection.
                  </p>
                  <div className="inline-block px-6 py-2 bg-gold/10 rounded-full">
                    <span className="text-gold text-sm font-medium">
                      Pioneering the future of entertainment metrics
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Metrics Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${metric.color} rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300`}
                />
                <div className="relative bg-midnight/80 backdrop-blur-sm p-6 rounded-xl border border-gold/20">
                  <motion.span
                    className={`block font-bold text-4xl bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-2`}
                    animate={{
                      backgroundPosition: ["0%", "100%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {metric.value}
                  </motion.span>
                  <h3 className="text-xl font-display text-ivory/90 mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-ivory/70">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* "Get in touch" button removed */}
        </div>
      </motion.div>

      {/* Background image slideshow */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.7 }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default Insights;
