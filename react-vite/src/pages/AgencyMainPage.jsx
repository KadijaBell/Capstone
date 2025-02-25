import ParticleBackground from '../components/Backgrounds/ParticleBackground';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

function AgencyMainPage() {
  return (
    <ParticleBackground>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-sm bg-white/5 rounded-3xl p-12"
          >
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold mb-6">
              Partner With Us
            </h1>
            <p className="text-xl text-ivory/90 leading-relaxed mb-8">
              Join our network of premier agencies and unlock exclusive opportunities
              to collaborate with top-tier talent, brands, and entertainment ventures.
            </p>
            <Link
              to="/agency-page"
              className="inline-block px-8 py-4 bg-gold text-midnight font-semibold rounded-xl
              hover:bg-gold/90 transition-colors duration-300 text-lg"
            >
              Register Your Agency
            </Link>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold">
            Why Partner With Us
            <div className="h-1 w-24 bg-gold mx-auto mt-6 rounded-full"></div>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Network",
                description: "Access our worldwide network of industry professionals, celebrities, and decision-makers.",
                icon: "🌎"
              },
              {
                title: "Premium Opportunities",
                description: "Get first access to high-value collaborations and exclusive partnership deals.",
                icon: "⭐"
              },
              {
                title: "Strategic Growth",
                description: "Leverage our platform's tools and insights to expand your agency's reach and impact.",
                icon: "📈"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-gold/20"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-gold mb-3">{benefit.title}</h3>
                <p className="text-ivory/80">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Partner Agencies" },
              { number: "500+", label: "Successful Projects" },
              { number: "50M+", label: "Audience Reach" },
              { number: "$10M+", label: "Revenue Generated" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-gold/20"
              >
                <div className="text-4xl font-bold text-gold mb-2">{stat.number}</div>
                <div className="text-ivory/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-gold/20"
          >
            <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold">
              Register Your Agency
              <div className="h-1 w-24 bg-gold mx-auto mt-6 rounded-full"></div>
            </h2>

            {/* Import and use your AgencyRegistrationForm component here */}
            <div className="space-y-8">
              {/* Form fields from AgencyPage */}
              {/* You can copy the form JSX from AgencyPage and paste it here */}
            </div>
          </motion.div>
        </section>

        {/* Testimonials or Featured Partners could go here */}

      </div>
    </ParticleBackground>
  );
}

export default AgencyMainPage;
