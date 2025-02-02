import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Foreground content */}
      <motion.div
        className="relative z-10 py-24 bg-charcoal text-ivory"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 flex flex-col items-center">
          {/* Title and description */}
          <motion.div
            className="space-y-6 max-w-xl text-center"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-3xl font-bold text-ivory capitalize"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
            >
              Our Insights
            </motion.h1>
            <motion.p
              className="text-blush dark:text-gray-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
                },
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              perferendis eos amet eum repudiandae aspernatur mollitia quos
              consectetur voluptatibus pariatur.
            </motion.p>
          </motion.div>

          {/* Metrics Section */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="relative p-4 bg-gray-200/30 rounded-md h-36 w-[110%] flex flex-col justify-center items-center text-center overflow-hidden group"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
                whileHover={{ scale: 1.1, translateZ: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-full group-hover:rotate-12"></div>

                <span className="block font-semibold text-2xl text-mint dark:text-mint">
                  {metric.value}
                </span>
                <h2 className="mt-1 font-medium text-gray-800 dark:text-gray-900">
                  {metric.title}
                </h2>
                <p className="mt-1 text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet.
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* "Get in touch" button */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
          >
            <a
              href="#"
              className="group relative inline-block px-6 py-3 text-xl font-semibold text-gold hover:text-ivory overflow-hidden"
            >
              {/* Shine effect overlay */}
              <span className="shine absolute inset-0" />
              {/* Button text */}
              <span className="relative">Get in touch</span>
            </a>
          </motion.div>
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
