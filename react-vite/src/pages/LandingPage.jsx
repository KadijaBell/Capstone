import { motion } from "framer-motion";
import LandingPageHeroSection from "../components/HeroSection/LandingPageHeroSection";
import OpenModalButton from "../components/OpenModalButton";
import SignUpFormModal from "../components/SignupFormModal";

function LandingPage() {
  const marketingServices = [
    {
      title: "Brand Development",
      description: "Custom strategies for artists and entertainment brands",
      icon: "🎯",
      color: "from-gold to-blush"
    },
    {
      title: "Digital Presence",
      description: "Social media management and content creation",
      icon: "💫",
      color: "from-mint to-gold"
    },
    {
      title: "Analytics & Insights",
      description: "Data-driven campaign optimization",
      icon: "📈",
      color: "from-blush to-mint"
    }
  ];

  const successMetrics = [
    {
      value: "300%",
      label: "Average Growth",
      description: "In social media engagement"
    },
    {
      value: "50+",
      label: "Active Clients",
      description: "In entertainment industry"
    },
    {
      value: "24/7",
      label: "Support",
      description: "Dedicated team assistance"
    }
  ];

  return (
    <div className="bg-midnight">
      <LandingPageHeroSection
        subtitle="Transform your digital presence with industry-leading marketing solutions"
        primaryButtonComponent={
          <OpenModalButton
            buttonText="Request Services"
            modalComponent={<SignUpFormModal />}
            className="bg-gold border border-ivory px-6 py-3 rounded-lg text-lg text-midnight font-semibold hover:bg-ivory hover:text-midnight transition duration-300"
          />
        }
        secondaryButtonText="View Portfolio"
        secondaryButtonLink="#portfolio"
      />

      {/* Services Section */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-ivory mb-16">
            Digital Marketing Excellence
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {marketingServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-midnight/50 backdrop-blur-sm border border-gold/20 rounded-xl p-6 relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-semibold text-gold mb-2">{service.title}</h3>
                <p className="text-ivory/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-charcoal/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {successMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6"
              >
                <div className="text-4xl font-bold text-gold mb-2">{metric.value}</div>
                <div className="text-xl text-ivory mb-1">{metric.label}</div>
                <div className="text-ivory/60">{metric.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-ivory mb-6">
            Ready to Amplify Your Brand?
          </h2>
          <p className="text-ivory/80 text-lg max-w-2xl mx-auto mb-8">
            Join the leading names in entertainment who trust us with their digital presence.
          </p>
          <OpenModalButton
            buttonText="Get Started Today"
            modalComponent={<SignUpFormModal />}
            className="bg-gold px-8 py-4 rounded-lg text-lg text-midnight font-semibold hover:bg-ivory hover:text-midnight transition duration-300"
          />
        </motion.div>
      </section>
    </div>
  );
}

export default LandingPage;
