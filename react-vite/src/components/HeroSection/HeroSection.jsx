import Masonry from "react-responsive-masonry";
import { motion } from "framer-motion";
import BlurText from "../BlurText/BlurText";
import ShinyText from "../ShinyText/ShinyText";

const images = [
  "/assets/capstone-image-1.jpg",
  "/assets/capstone-image-2.jpg",
  "/assets/capstone-image-3.jpg",
  "/assets/capstone-image-4.jpg",
  "/assets/capstone-image-5.jpg",
  "/assets/capstone-image-6.jpg",
  "/assets/capstone-image-7.jpg",
  "/assets/capstone-image-8.jpg",
];

function HeroSection({ subtitle, primaryButtonText, primaryButtonLink, primaryButtonComponent, secondaryButtonText, secondaryButtonLink }) {
  return (
<<<<<<< Updated upstream
    <main className="w-full">
      <section className="relative pt-10 xl:pt-14 bg-midnight text-ivory">
        {/* Use a container with flex-col to stack elements vertically */}
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-row gap-8 lg:gap-10 xl:gap-12">
          {/* Hero Text Section with Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8"
=======
    <motion.section
      initial="hidden"
      animate="visible"
      // variants={heroVariants}
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-20"
    >
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dit6mlemk/video/upload/v1739917715/jsfqlmbblabhkmkbudb4.mp4"
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-black/60 to-midnight/70 z-10"></div>

      {/* Optional subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/grain.png')] z-20"></div>

      {/* Content */}
      <div className="relative z-20 text-ivory px-6 max-w-4xl">
        {/* Animated Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          whileHover={{ scale: 1.05 }}
        >
          WELCOME TO{" "}
          <span className="hover:text-red-600 transition-colors duration-600">C</span>AL
          <span className="hover:text-red-600 transition-colors duration-600">I</span>F{" "}
          P<span className="hover:text-red-600 transition-colors duration-600">I</span>ERRE
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl font-light mt-4 drop-shadow-lg text-ivory/90 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full"
        >
          {/* Primary Button */}
          {primaryButtonComponent || (
            <motion.a
              href={primaryButtonLink}
              className="relative bg-gold border border-ivory px-6 py-3 rounded-lg text-lg transition w-full sm:w-auto hover:shadow-button-glow"
              whileHover={{ scale: 1.05 }}
            >
              {primaryButtonText}
            </motion.a>
          )}

          {/* Secondary Button */}
          <motion.a
            href={secondaryButtonLink}
            className="relative border border-ivory px-6 py-3 rounded-lg text-lg hover:bg-mint hover:text-midnight transition w-full sm:w-auto hover:shadow-button-glow"
            whileHover={{ scale: 1.05 }}
>>>>>>> Stashed changes
          >
            {/* Hero Heading with Animated Blur Effect */}
            <h1 className="font-semibold">
              {/* First part of the heading */}
              <BlurText
                text="Build Your Online Platform with the best Digital Agency"
                className="text-ivory dark:text-black text-4xl sm:text-6xl lg:text-5xl xl:text-6xl inline-block mb-6"
                delay={150}
                animateBy="words"
                direction="top"
              />{" "}
              {/* Second part with special styling */}
              <ShinyText className="text-ivory dark:text-gold text-4xl sm:text-6xl lg:text-5xl xl:text-6xl inline-block text-italic">
                <span className="bg-charcoal dark:bg-black dark:text-gold inline-block border border-dashed border-gold px-3 padding-y-5">
                  <BlurText
                    text="Calif Pierre"
                    className="text-ivory dark:text-gold text-4xl sm:text-6xl lg:text-5xl xl:text-6xl inline-block text-italic"
                    delay={150}
                    animateBy="words"
                    direction="top"
                  />
                </span>
              </ShinyText>
            </h1>

            {/* Hero Paragraph with Animated Blur Effect */}
            <BlurText
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, fugit! Laborum quo maxime at sapiente quasi."
              className="mt-10 text-blush dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto"
              delay={200}
              animateBy="words"
              direction="top"
            />
          </motion.div>

          {/* Masonry Section placed below the text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} // delay to sequence after text
            className="mx-auto w-full max-w-7xl px-5 sm:px-10 md:px-12 lg:px-5"
          >
            <Masonry columnsCount={4} gutter="1rem">
              {images.map((src, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{
                    height: index % 3 === 0 ? "200px" : "155px",
                  }}
                >
                  <img
                    src={src}
                    alt={`Capstone ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </Masonry>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default HeroSection;
