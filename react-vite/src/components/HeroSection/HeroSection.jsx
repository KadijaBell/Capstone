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

const HeroSection = () => {
  return (
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
          >
            {/* Hero Heading with Animated Blur Effect */}
            <h1 className="font-semibold">
              {/* First part of the heading */}
              <BlurText
                text="Build Your Online Platform with the best Digital Agency"
                className="text-ivory dark:text-black text-4xl sm:text-6xl lg:text-5xl xl:text-6xl inline-block"
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
};

export default HeroSection;
