import AboutUs from "../AboutUs/AboutUs";
import Insights from "../Insights/Insights";
import Agencies from "../Agencies/Agencies";

import { motion } from "framer-motion";
import HeroSection from "../HeroSection/HeroSection";




function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section id="home">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
        </section>

        {/* About Us Section */}
        <section id="about-us">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <AboutUs />
          </motion.div>
        </section>

      {/* Insights Section */}
      <section id="insights">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Insights />
        </motion.div>
      </section>

      {/* Agencies Section */}
      <section id="agencies">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Agencies />
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;
