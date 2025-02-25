import { motion } from "framer-motion";
import EventCard from "../components/EventCard/EventCard";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ParticleBackground from '../components/Backgrounds/ParticleBackground';

// const BackgroundAnimation = () => (
//   <div className="absolute inset-0 -z-10 overflow-hidden">
//     <motion.div
//       className="w-full h-full"
//       animate={{
//         background: [
//           "linear-gradient(45deg, rgba(203, 161, 53, 0.05) 0%, rgba(44, 62, 80, 0.05) 100%)",
//           "linear-gradient(45deg, rgba(44, 62, 80, 0.05) 0%, rgba(203, 161, 53, 0.05) 100%)",
//         ],
//       }}
//       transition={{
//         duration: 10,
//         repeat: Infinity,
//         repeatType: "reverse",
//       }}
//     />
//   </div>
// );

// const DitheredBackground = () => (
//   <div className="fixed inset-0 z-0 opacity-10">
//     <div className="absolute inset-0" style={{
//       backgroundImage: `
//         radial-gradient(circle at center, #CBA135 0.5px, transparent 0.5px),
//         radial-gradient(circle at center, #2C3E50 0.25px, transparent 0.25px)
//       `,
//       backgroundSize: '24px 24px, 16px 16px',
//       backgroundPosition: '0 0, 8px 8px',
//     }} />
//   </div>
// );

function CommunityPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/events/public", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const data = await response.json();
      if (data && data.events) {
        setEvents(data.events);
      } else {
        throw new Error("No events data received");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // const fadeInUp = {
  //   initial: { opacity: 0, y: 20 },
  //   whileInView: { opacity: 1, y: 0 },
  //   viewport: { once: true },
  //   transition: { duration: 0.6 }
  // };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };



  if (isLoading) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <ParticleBackground>
      <div className="py-8 px-6 sm:px-8 lg:px-12">
        <motion.section
          className="text-center max-w-3xl mb-16 mx-auto relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="backdrop-blur-sm bg-black/10 rounded-xl p-8">
            <h1 className="text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold font-montserrat py-12">
              Building Community Through Innovation
            </h1>
            <p className="text-2xl text-ivory/90 leading-relaxed font-poppins italic max-w-4xl mx-auto">
              Join a thriving ecosystem where gamers, creators, and industry leaders converge.
              Experience events that celebrate innovation, foster connections, and shape the future
              of gaming entertainment.
            </p>
          </div>
        </motion.section>

        {/* Community Initiatives Section */}
        <motion.section className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-ivory mb-12 text-center drop-shadow-[0_0_0.3rem_#E8B4B8]">
            Community Initiatives
            <div className="h-1.5 w-32 bg-gold mx-auto mt-6 rounded-full"></div>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <motion.div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <motion.div className="text-6xl mb-8">
                🎯
              </motion.div>
              <h3 className="text-3xl font-bold text-gold mb-6">Talent Discovery</h3>
              <p className="text-xl text-charcoal/90 font-medium">
                Showcasing emerging talent and connecting them with industry opportunities.
              </p>
            </motion.div>

            <motion.div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <motion.div className="text-6xl mb-8">
                🫱🏽‍🫲🏾
              </motion.div>
              <h3 className="text-3xl font-bold text-gold mb-6">Networking Events</h3>
              <p className="text-xl text-charcoal/90 font-medium">
                Creating spaces for meaningful connections and collaboration.
              </p>
            </motion.div>

            <motion.div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-elegant hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <motion.div className="text-6xl mb-8">
                🚀
              </motion.div>
              <h3 className="text-3xl font-bold text-gold mb-6">Data & Innovation</h3>
              <p className="text-xl text-charcoal/90 font-medium">
                Supporting community members with resources and mentorship opportunities.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Community Impact Section */}
        <motion.section className="max-w-7xl mx-auto px-6 py-24">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 md:p-16 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-ivory mb-8 drop-shadow-[0_0_0.3rem_#E8B4B8]">
              Community Impact
              <div className="h-1.5 w-32 bg-gold mx-auto mt-6 rounded-full"></div>
            </h2>
            <p className="text-2xl text-ivory/90 mb-10 font-poppins max-w-4xl mx-auto leading-relaxed">
              Our community thrives on authentic engagement and collaborative growth. We&apos;re building
              a space where passion meets opportunity, creating lasting connections in the gaming industry.
            </p>
          </div>
        </motion.section>

        {/* Interactive Stats Section */}
        <motion.section
          className="max-w-7xl mx-auto px-4 py-16 text-center"
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="bg-white/90 backdrop-blur-sm hover:bg-gradient-to-b hover:from-white hover:to-blush/20 p-8 rounded-xl shadow-elegant group hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-5xl font-bold text-gold mb-3 group-hover:scale-110 transition-transform duration-300">10K+</h3>
              <p className="text-charcoal/80 font-poppins">Active Community Members</p>
            </motion.div>
            <motion.div
              className="bg-white/90 backdrop-blur-sm hover:bg-gradient-to-b hover:from-white hover:to-blush/20 p-8 rounded-xl shadow-elegant group hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-5xl font-bold text-gold mb-3 group-hover:scale-110 transition-transform duration-300">50+</h3>
              <p className="text-charcoal/80 font-poppins">Monthly Events</p>
            </motion.div>
            <motion.div
              className="bg-white/90 backdrop-blur-sm hover:bg-gradient-to-b hover:from-white hover:to-blush/20 p-8 rounded-xl shadow-elegant group hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-5xl font-bold text-gold mb-3 group-hover:scale-110 transition-transform duration-300">200+</h3>
              <p className="text-charcoal/80 font-poppins">Success Stories</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Events Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blush mb-6 drop-shadow-[0_0_0.3rem_#E8B4B8]">
              Featured Events
              <div className="h-1.5 w-32 bg-gold mx-auto mt-6 rounded-full"></div>
            </h2>
          </div>

          <div className="flex justify-end mb-12">
            <motion.button
              onClick={() => navigate('/events')}
              className="inline-flex items-center justify-center px-8 py-4 text-xl text-gold border-2 border-gold rounded-xl hover:bg-navy bg-midnight/50 backdrop-blur-sm transition-colors duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Events</span>
              <svg
                className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </motion.button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} isPublic={true} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-blush/60 text-2xl">
                No events available at this time
              </div>
            )}
          </div>
        </section>

        {/* Join Community Section*/}
        <section className="max-w-3xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/95 rounded-2xl p-12 shadow-elegant"
          >
            <h2 className="text-3xl font-bold text-midnight mb-6">Join Our Community</h2>
            <p className="text-lg text-charcoal/80 mb-8 max-w-xl mx-auto">
              Be part of a growing network of gaming enthusiasts and industry professionals.
            </p>
            <motion.a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 bg-midnight text-gold rounded-lg hover:bg-navy transition-colors shadow-elegant group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Today</span>
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7-7 7"/>
              </svg>
            </motion.a>
          </motion.div>
        </section>
      </div>
    </ParticleBackground>
  );
}

export default CommunityPage;
// import { motion } from "framer-motion";
// import EventCard from "../components/EventCard/EventCard";
// import { useState, useEffect } from "react";
// import LoadingSpinner from "../components/LoadingSpinner";
// import { useNavigate } from "react-router-dom";
// import ParticleBackground from '../components/Backgrounds/ParticleBackground';

// function CommunityPage() {
//   const [events, setEvents] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchEvents = async () => {
//     try {
//       setIsLoading(true);
//       const response = await fetch("/api/events/public", {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include'
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }

//       const data = await response.json();
//       if (data && data.events) {
//         setEvents(data.events);
//       } else {
//         throw new Error("No events data received");
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       setError("Failed to load events");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // const staggerContainer = {
//   //   initial: { opacity: 0 },
//   //   whileInView: { opacity: 1 },
//   //   viewport: { once: true },
//   //   transition: { staggerChildren: 0.2 }
//   // };

//   if (isLoading) {
//     return <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 py-8">{error}</div>;
//   }

//   return (
//     <ParticleBackground>
//       <div className="py-20 px-6 sm:px-12 lg:px-20">

//         {/* Hero Section */}
//         <motion.section
//           className="text-center max-w-6xl mx-auto mb-20 relative"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="backdrop-blur-lg bg-black/30 rounded-3xl p-14 shadow-lg">
//             <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold/80 to-gold font-montserrat py-10 drop-shadow-lg">
//               Building Community Through Innovation
//             </h1>
//             <p className="text-xl text-ivory/90 font-light max-w-4xl mx-auto italic">
//               A thriving ecosystem where gamers, creators, and industry leaders connect.
//               Discover events that celebrate innovation, foster connections, and shape the future of gaming.
//             </p>
//           </div>
//         </motion.section>

//         {/* Community Initiatives */}
//         <motion.section className="max-w-7xl mx-auto px-6 py-24">
//           <h2 className="text-4xl font-extrabold text-ivory text-center drop-shadow-lg mb-12">
//             Community Initiatives
//             <div className="h-1 w-32 bg-gold mx-auto mt-4 rounded-full"></div>
//           </h2>
//           <div className="grid md:grid-cols-3 gap-12">
//             {[
//               { icon: "🎯", title: "Talent Discovery", desc: "Connecting emerging talent with industry opportunities." },
//               { icon: "🤝", title: "Networking Events", desc: "Spaces for meaningful connections and collaborations." },
//               { icon: "🚀", title: "Data & Innovation", desc: "Supporting communities with insights & mentorship." }
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white/95 backdrop-blur-lg p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <div className="text-6xl mb-6">{item.icon}</div>
//                 <h3 className="text-2xl font-bold text-gold mb-4">{item.title}</h3>
//                 <p className="text-lg text-gray-700 font-medium">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Community Impact */}
//         <motion.section className="max-w-7xl mx-auto px-6 py-24">
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-16 text-center shadow-lg">
//             <h2 className="text-4xl font-extrabold text-ivory mb-6 drop-shadow-lg">
//               Community Impact
//               <div className="h-1 w-32 bg-gold mx-auto mt-4 rounded-full"></div>
//             </h2>
//             <p className="text-xl text-ivory/90 leading-relaxed max-w-4xl mx-auto">
//               A passionate community where talent, creativity, and opportunity intersect, fostering a
//               lasting impact on the gaming industry.
//             </p>
//           </div>
//         </motion.section>

//         {/* Featured Events */}
//         <section className="max-w-7xl mx-auto px-6 py-24">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-extrabold text-blush drop-shadow-lg mb-6">
//               Featured Events
//               <div className="h-1 w-32 bg-gold mx-auto mt-4 rounded-full"></div>
//             </h2>
//           </div>

//           <div className="flex justify-end mb-12">
//             <motion.button
//               onClick={() => navigate('/events')}
//               className="inline-flex items-center px-8 py-4 text-xl text-gold border-2 border-gold rounded-xl hover:bg-navy bg-midnight/50 backdrop-blur-lg transition-all duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               View All Events →
//             </motion.button>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {events.length > 0 ? (
//               events.map((event) => (
//                 <EventCard key={event.id} event={event} isPublic={true} />
//               ))
//             ) : (
//               <div className="col-span-full text-center text-blush/70 text-xl">No events available</div>
//             )}
//           </div>
//         </section>

//         {/* Join Community */}
//         <section className="max-w-3xl mx-auto px-4 py-20 text-center">
//           <motion.div
//             className="bg-white/90 backdrop-blur-lg rounded-2xl p-12 shadow-lg"
//             whileHover={{ scale: 1.02 }}
//           >
//             <h2 className="text-3xl font-bold text-midnight mb-6">Join Our Community</h2>
//             <p className="text-lg text-gray-700 mb-8">Connect with a vibrant network of gamers, creators, and industry professionals.</p>
//             <motion.a href="/signup" className="bg-midnight text-gold px-8 py-3 rounded-lg hover:bg-navy transition-all">
//               Get Started →
//             </motion.a>
//           </motion.div>
//         </section>
//       </div>
//     </ParticleBackground>
//   );
// }

// export default CommunityPage;
