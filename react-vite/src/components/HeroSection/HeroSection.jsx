import Masonry from "react-responsive-masonry";
import { motion } from "framer-motion";
import BlurText from "../BlurText/BlurText";
import ShinyText from "../ShinyText/ShinyText";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";

const images = [
  "/assets/capstone-image-1.jpg",
  "/assets/capstone-image-5.jpg",
  "/assets/capstone-image-3.jpg",
  "/assets/capstone-image-4.jpg",
  "/assets/capstone-image-6.jpg",
  "/assets/capstone-image-7.jpg",
  "/assets/capstone-image-8.jpg",
  "/assets/capstone-image-2.jpg",

];

function HeroSection() {
  return (
    <main className="w-full">
      <section className="relative min-h-screen flex items-center">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="https://res.cloudinary.com/dit6mlemk/video/upload/v1739917715/jsfqlmbblabhkmkbudb4.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-black/60 to-midnight/70 z-10" />

        {/* Optional subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/grain.png')] z-20" />

        {/* Main Content */}
        <div className="relative z-30 mx-auto max-w-7xl px-5 sm:px-10 md:px-12 lg:px-5 flex gap-12">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-[55%]"
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
              <h1 className="text-ivory text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] mb-10">
                <BlurText
                  text="Build Your Online Platform with the best Digital Agency"
                  delay={150}
                  animateBy="words"
                  direction="top"
                />
              </h1>
            </motion.div>

            {/* Brand Name with enhanced styling */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ShinyText>
                <span className="text-gold text-6xl sm:text-7xl font-bold relative">
                  <motion.span
                    className="absolute -inset-4 bg-gold/10 rounded-lg -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <BlurText
                    text="Calif Pierre"
                    delay={200}
                    animateBy="letters"
                    direction="left"
                  />
                </span>
              </ShinyText>
            </motion.div>

            {/* Enhanced Tagline */}
            <div className="space-y-6">
              {/* <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-gold/80 text-lg tracking-[0.3em] font-medium"
              >
                L E V E L I N G T H E P L A Y I N G F I E L D
              </motion.p> */}
              {/* <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-ivory text-2xl font-medium tracking-wide font-display"
              >
                Approaching entertainment with a community focus
              </motion.p> */}

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex gap-4 pt-8"
              >
                <OpenModalButton
                  buttonText="Get Started"
                  modalComponent={<SignupFormModal />}
                  className="bg-gold border border-ivory px-6 py-3 rounded-lg text-lg text-midnight font-semibold hover:bg-ivory hover:text-midnight transition duration-300"
                />
                <a
                  href="#about-us"
                  className="border border-ivory px-6 py-3 rounded-lg text-lg text-ivory hover:bg-mint hover:text-midnight transition duration-300"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Grid - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[45%] relative"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Enhanced Masonry Grid */}
            <div className="relative backdrop-blur-sm bg-midnight/10 p-3 rounded-2xl border border-gold/10">
              <Masonry columnsCount={2} gutter="0.5rem">
                {images.map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-gold via-mint to-blush rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                    <div className="relative overflow-hidden rounded-lg shadow-elegant mb-2">
                      <motion.img
                        src={src}
                        alt={`Capstone ${index + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.2, rotate: -5 }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                          transition: { duration: 0.8, delay: index * 0.1 }
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 }
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-midnight/20 to-transparent"
                      />
                      {/* Hover effect overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent backdrop-blur-sm flex items-end"
                      >
                        <div className="p-4 text-ivory/90 text-sm font-medium">
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            View Project
                          </motion.span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <motion.div
          className="absolute inset-0 bg-pattern-dots bg-dots-sm opacity-5 pointer-events-none z-20"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </section>
    </main>
  );
}

export default HeroSection;
