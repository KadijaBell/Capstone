import { motion } from "framer-motion";

function AboutUs() {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-8 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl font-bold text-midnight">About Us</h1>
      <p className="text-charcoal leading-relaxed">
        Calif Pierre is a solutions company focused on community-driven impact through celebrity partnerships,
        cultural initiatives, and innovative entertainment solutions.
      </p>

      <h2 className="text-3xl font-semibold text-gold">What Sets Us Apart</h2>
      <p className="text-charcoal">
        Our expertise in event planning, brand activations, and digital marketing makes us a leading choice
        for companies seeking genuine audience engagement.
      </p>

      <h2 className="text-3xl font-semibold text-gold">Who We Are</h2>
      <p className="text-charcoal">
        Founded by industry experts with over 25 years of experience, Calif Pierre is at the forefront of shaping
        the future of entertainment and audience connections.
      </p>
    </motion.div>
  );
}

export default AboutUs;
