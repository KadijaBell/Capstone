import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import PixelCard from "../PixelCard/PixelCard";

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
  { value: "12K+", title: "Metric Title 1" },
  { value: "50+", title: "Metric Title 2" },
  { value: "100%", title: "Metric Title 3" },
  { value: "5K+", title: "Metric Title 4" },
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

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 1, ease: "easeIn" } },
  };

  return (
    <section id="insights" className="relative overflow-hidden min-h-screen">
      {/* Foreground content */}
      <motion.div
        className="relative z-10 py-24 bg-charcoal text-ivory"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 flex flex-col items-center">
          {/* Text Container with fixed height */}
          <div
            className="space-y-6 max-w-xl text-center"
            style={{ minHeight: "220px" }}
          >
            {/* AnimatePresence ensures exit completes before next element enters */}
            <AnimatePresence mode="wait">
              {!showData && (
                <motion.h1
                  key="deliver-heading"
                  className="text-3xl font-bold text-ivory capitalize"
                  variants={headingVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.1, translateZ: 20 }}
                >
                  WHAT WE DELIVER
                </motion.h1>
              )}
              {showData && (
                <motion.h1
                  key="data-heading"
                  className="text-3xl font-bold text-ivory capitalize"
                  variants={headingVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.1, translateZ: 20 }}
                >
                  DATA
                </motion.h1>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {!showData && (
                <motion.p
                  key="deliver-para"
                  className="text-blush dark:text-gray-300"
                  variants={paragraphVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Based around our three targets of focus, our services will be
                  as follows: portfolio creation for artist profile and company,
                  influencer portfolio, event concept creation, activation,
                  community impact strategies for endemic and non-endemic
                  relationships in entertainment, and data collection around all
                  of these properties to curate an accurate account of consumer
                  engagement, needs, activity, and interests based on our
                  projects.
                </motion.p>
              )}
              {showData && (
                <motion.p
                  key="data-para"
                  className="text-blush dark:text-gray-300"
                  variants={paragraphVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  Through a new developing partnership with Billboard Magazine,
                  we will be beginning a new conversation about how we approach
                  data collection in communities, with a focus on video games.
                  We’re excited to campaign to add Video Gaming to Billboard
                  charts, among introducing new ways to collect data at live
                  events.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Metrics Section with Pixel Card Effect */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
            }}
          >
            {metrics.map((metric, index) => (
              <PixelCard
                key={index}
                variant="yellow" // or "blue", "yellow", "pink", etc.
                // Pass the original card styles so the content looks exactly as before
                className="relative p-4 bg-gray-200/30 rounded-md h-36 w-[110%] flex flex-col justify-center items-center text-center overflow-hidden group"
                gap={4.7}
                speed={50}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.8 },
                    },
                  }}
                  whileHover={{ scale: 1.1, translateZ: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <span className="block font-semibold text-2xl text-mint dark:text-mint">
                    {metric.value}
                  </span>
                  <h2 className="mt-1 font-medium text-gray-800 dark:text-black-900">
                    {metric.title}
                  </h2>
                  <p className="mt-1 text-700 text-sm text-gray-800 dark:text-black-900">
                    Lorem ipsum dolor sit amet.
                  </p>
                </motion.div>
              </PixelCard>
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
