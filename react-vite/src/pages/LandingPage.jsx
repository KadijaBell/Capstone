import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function LandingPage() {
  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  return (
    <div className="bg-midnightBlue text-ivoryWhite min-h-screen">
       <motion.div
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        className="hero-section text-white"
      >
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Calif Pierre
        </motion.h1>
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
        A SOLUTIONS COMPANY ROOTED IN CULTURAL IMPACT <br>
        </br>Effortlessly manage events and connect with your community.
        </motion.p>
        <div className="mt-6">
          <NavLink
            to="/signup"
            className="bg-gold text-midnightBlue px-6 py-2 rounded-full hover:bg-ivoryWhite transition"
        >
            Get Started
          </NavLink>

           {/* Features Section */}
        <section className="py-20 px-10">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>
            <div className="flex flex-wrap justify-around">
            <div className="bg-mintGreen p-6 rounded-lg text-center shadow-md max-w-sm mb-6">
                <h3 className="text-2xl font-bold mb-4">Customized Planning</h3>
                <p>Events tailored to your unique needs and style.</p>
            </div>
            <div className="bg-blushPink p-6 rounded-lg text-center shadow-md max-w-sm mb-6">
                <h3 className="text-2xl font-bold mb-4">Professional Team</h3>
                <p>Our experts ensure seamless execution every time.</p>
            </div>
            <div className="bg-gold p-6 rounded-lg text-center shadow-md max-w-sm mb-6">
                <h3 className="text-2xl font-bold mb-4">Top-notch Services</h3>
                <p>From catering to decor, we handle it all.</p>
            </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-mutedCharcoal text-ivoryWhite px-10">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Clients Say</h2>
            <div className="flex flex-wrap justify-around">
            <blockquote className="bg-midnightBlue p-6 rounded-lg max-w-sm text-center mb-6">
                <p>
                  &&quot;Calif Pierre made our dream wedding a reality! Their team was professional and attentive to every detail.
                  The customized planning, top-notch services, and professional team made our event truly unforgettable.&quot;
                </p>
                <footer>- Sarah & James</footer>
            </blockquote>
            <blockquote className="bg-midnightBlue p-6 rounded-lg max-w-sm text-center mb-6">
                <p>
                &quot;Their team was professional and attentive to every detail. The customized planning, top-notch services,
                  and professional team made our event truly unforgettable.&quot;
                </p>
                <footer>- Emily T.</footer>
            </blockquote>
            </div>
        </section>
                {/* Footer */}
            <footer className="bg-midnightBlue text-center py-6">
                <p>© 2025 Calif Pierre. All rights reserved.</p>
            </footer>
            </div>
        </motion.div>
        </div>
  );
}

export default LandingPage;
