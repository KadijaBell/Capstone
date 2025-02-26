import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm/ContactForm";
import ParticleBackground from '../components/Backgrounds/ParticleBackground';
function AboutUsPage() {
  const leaders = [
    {
      name: "John Doe",
      title: "CEO & Founder",
      image: "../../dist/assets/leader-1.jpg",
      bio: "20+ years of experience in digital marketing and community building...",
      linkedin: "https://linkedin.com/in/johndoe",
      email: "john.doe@example.com"
    },
    {
      name: "Jane Smith",
      title: "Chief Strategy Officer",
      image: "../../dist/assets/leader-2.jpg",
      bio: "Former entertainment executive with expertise in talent management...",
      linkedin: "https://linkedin.com/in/janesmith",
      email: "jane.smith@example.com"
    },
    {
      name: "Mike Johnson",
      title: "Community Relations Director",
      image: "../../dist/assets/leader-3.jpg",
      bio: "Dedicated to building bridges between brands and communities...",
      linkedin: "https://linkedin.com/in/mikejohnson",
      email: "mike.johnson@example.com"
    }
  ];

  return (
    <ParticleBackground>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-12 space-y-16"
    >
      {/* Company Overview */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-mint mb-6 pt-20">About Calif Pierre</h1>
        <p className="text-3xl text-blush leading-relaxed">
          We are a solutions company focused on creating meaningful connections between celebrities,
          communities, and brands. Our innovative approach combines data-driven insights with
          authentic relationship building to create lasting impact.
        </p>
      </section>

      {/* Leadership Section */}
      <section className="py-12">
        <h2 className="text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold">
          Our Leadership
          <div className="h-1.5 w-32 bg-gold mx-auto mt-8 rounded-full"></div>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-elegant border border-gold/20 group"
            >
              <div className="aspect-w-4 aspect-h-5 relative overflow-hidden bg-midnight/40">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  style={{
                    objectPosition: "center 20%",
                    filter: "brightness(0.9) contrast(1.1)"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent opacity-80" />
              </div>
              <div className="p-8 space-y-4 relative z-10 bg-gradient-to-t from-midnight/90 to-midnight/40">
                <h3 className="text-2xl font-bold text-gold">{leader.name}</h3>
                <p className="text-ivory/90 font-medium text-lg">{leader.title}</p>
                <p className="text-ivory/70 text-base leading-relaxed">{leader.bio}</p>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-ivory/90 hover:text-gold transition-colors px-4 py-2 rounded-lg border border-gold/20 hover:border-gold/50 backdrop-blur-sm hover:bg-white/5"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect
                  </a>
                  <a
                    href={`mailto:${leader.email}`}
                    className="flex items-center gap-2 text-ivory/90 hover:text-gold transition-colors px-4 py-2 rounded-lg border border-gold/20 hover:border-gold/50 backdrop-blur-sm hover:bg-white/5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-midnight/5 backdrop-blur-sm rounded-3xl p-8 md:p-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold"
          >
            Get in Touch
            <div className="h-1.5 w-32 bg-gold mx-auto mt-8 rounded-full"></div>
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </motion.div>
      </section>
    </motion.div>
    </ParticleBackground>
  );
}

export default AboutUsPage;
// import { motion } from "framer-motion";
// import ContactForm from "../components/ContactForm/ContactForm";

// const leaders = [
//   { name: "John Doe", title: "CEO & Founder", image: "/placeholder.jpg", linkedin: "https://linkedin.com/in/johndoe" },
//   { name: "Jane Smith", title: "Chief Strategy Officer", image: "/placeholder.jpg", linkedin: "https://linkedin.com/in/janesmith" },
//   { name: "Mike Johnson", title: "Community Relations Director", image: "/placeholder.jpg", linkedin: "https://linkedin.com/in/mikejohnson" },
// ];

// function AboutUsPage() {
//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-12 space-y-16">
//       <section className="text-center max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-midnight">About Calif Pierre</h1>
//         <p className="text-lg text-charcoal/80 mt-4">
//           We are a solutions company connecting celebrities, brands, and communities.
//         </p>
//       </section>

//       {/* Team Section */}
//       <section className="py-12">
//         <h2 className="text-3xl font-bold text-center mb-12">Our Leadership</h2>
//         <div className="grid md:grid-cols-3 gap-8">
//           {leaders.map((leader) => (
//             <motion.div key={leader.name} className="bg-white/80 rounded-lg overflow-hidden shadow-elegant" whileHover={{ scale: 1.05 }}>
//               <img src={leader.image} alt={leader.name} className="w-full h-56 object-cover" />
//               <div className="p-6 text-center">
//                 <h3 className="text-xl font-bold text-midnight">{leader.name}</h3>
//                 <p className="text-gold font-medium">{leader.title}</p>
//                 <a href={leader.linkedin} className="text-midnight hover:text-gold mt-2 block">Connect on LinkedIn →</a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Contact */}
//       <section className="bg-midnight/5 rounded-2xl p-8 md:p-12">
//         <h2 className="text-3xl font-bold text-center mb-6">Get in Touch</h2>
//         <ContactForm />
//       </section>
//     </motion.div>
//   );
// }

// export default AboutUsPage;
