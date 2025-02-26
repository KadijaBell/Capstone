import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutUs from "../components/AboutUs/AboutUs";
import Community from "../components/Community/Community";
import Insights from "../components/Insights/Insights";
import Agencies from "../components/Agencies/Agencies";

function HomePage() {
  const marketingServices = [
    {
      title: "Brand Development",
      description: "Custom strategies for artists and entertainment brands",
      icon: "✧",
      color: "from-gold via-blush to-gold"
    },
    {
      title: "Digital Presence",
      description: "Social media management and content creation",
      icon: "◈",
      color: "from-mint via-gold to-mint"
    },
    {
      title: "Analytics & Insights",
      description: "Data-driven campaign optimization",
      icon: "❖",
      color: "from-blush via-mint to-blush"
    }
  ];

  return (
    <>
      {/* Hero Section - Keep your current dynamic hero with video background */}
      <section id="home">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <HeroSection />
        </motion.div>
      </section>

      {/* Services Showcase - New section combining elements from both pages */}
      <section className="py-24 bg-midnight/95 relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-gold via-mint to-blush bg-clip-text text-transparent mb-16">
            Our Digital Marketing Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {marketingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${service.color} rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500`}
                />
                <div className="relative bg-midnight/80 backdrop-blur-sm border border-gold/20 rounded-lg p-6 h-full">
                  <motion.div
                    className={`text-3xl mb-4 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className={`text-2xl font-display font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent mb-3`}>
                    {service.title}
                  </h3>
                  <p className="text-ivory/80 text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* About Us Section - Keep your existing section */}
      <section id="about-us">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AboutUs />
        </motion.div>
      </section>

      {/* Community Section */}
      <section id="community">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Community />
        </motion.div>
      </section>

      {/* Insights Section - Keep your existing section */}
      <section id="insights">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Insights />
        </motion.div>
      </section>

      {/* Agencies Section - Keep your enhanced version */}
      <section id="agencies">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Agencies />
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;
