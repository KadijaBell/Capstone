import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm/ContactForm";

function AboutUsPage() {
  const leaders = [
    {
      name: "John Doe",
      title: "CEO & Founder",
      image: "/path-to-image.jpg",
      bio: "20+ years of experience in digital marketing and community building...",
      linkedin: "https://linkedin.com/in/johndoe"
    },
    {
      name: "Jane Smith",
      title: "Chief Strategy Officer",
      image: "/path-to-image.jpg",
      bio: "Former entertainment executive with expertise in talent management...",
      linkedin: "https://linkedin.com/in/janesmith"
    },
    {
      name: "Mike Johnson",
      title: "Community Relations Director",
      image: "/path-to-image.jpg",
      bio: "Dedicated to building bridges between brands and communities...",
      linkedin: "https://linkedin.com/in/mikejohnson"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-4 py-12 space-y-16"
    >
      {/* Company Overview */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-midnight mb-6">About Calif Pierre</h1>
        <p className="text-lg text-charcoal/80 leading-relaxed">
          We are a solutions company focused on creating meaningful connections between celebrities,
          communities, and brands. Our innovative approach combines data-driven insights with
          authentic relationship building to create lasting impact.
        </p>
      </section>

      {/* Leadership Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Leadership
          <div className="h-1 w-24 bg-gold mx-auto mt-4 rounded-full"></div>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-lg overflow-hidden shadow-elegant"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-midnight">{leader.name}</h3>
                <p className="text-gold font-medium mb-3">{leader.title}</p>
                <p className="text-charcoal/80 mb-4">{leader.bio}</p>
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-midnight hover:text-gold transition"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-midnight/5 rounded-2xl p-8 md:p-12 mt-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Get in Touch
            <div className="h-1 w-24 bg-gold mx-auto mt-4 rounded-full"></div>
          </h2>
          <ContactForm />
        </div>
      </section>
    </motion.div>
  );
}

export default AboutUsPage;
