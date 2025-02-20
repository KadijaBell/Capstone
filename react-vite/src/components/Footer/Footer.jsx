import { motion } from "framer-motion";

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-mutedCharcoal text-ivoryWhite py-6 text-center"
    >
      <div className="container mx-auto px-6">
        <p className="mb-4 text-sm">
          © 2025 <span className="font-semibold">Calif Pierre</span>. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-ivory hover:text-gold transition duration-300"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-ivory hover:text-gold transition duration-300"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-ivory hover:text-gold transition duration-300"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
