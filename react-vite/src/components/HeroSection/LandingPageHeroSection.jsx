// import { motion } from "framer-motion";

// function LandingPageHeroSection({ subtitle, primaryButtonText, primaryButtonLink, primaryButtonComponent, secondaryButtonText, secondaryButtonLink }) {
//     return (
//       <motion.section
//         initial="hidden"
//         animate="visible"
//         // variants={heroVariants}
//         className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-10 md:px-20"
//       >
//         {/* Video Background */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover z-0"
//           src="https://res.cloudinary.com/dit6mlemk/video/upload/v1739917715/jsfqlmbblabhkmkbudb4.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//         ></video>

//         {/* Overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-black/60 to-midnight/70 z-10"></div>

//         {/* Optional subtle grain texture overlay */}
//         <div className="absolute inset-0 opacity-[0.04] bg-[url('/grain.png')] z-20"></div>

//         {/* Content */}
//         <div className="relative z-20 text-ivory px-6 max-w-4xl">
//           {/* Animated Title */}
//           <motion.h1
//             className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg cursor-pointer"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
//             whileHover={{ scale: 1.05 }}
//           >
//             WELCOME TO{" "}
//             <span className="hover:text-red-600 transition-colors duration-600">C</span>AL
//             <span className="hover:text-red-600 transition-colors duration-600">I</span>F{" "}
//             P<span className="hover:text-red-600 transition-colors duration-600">I</span>ERRE
//           </motion.h1>

//           {/* Subtitle Animation */}
//           <motion.p
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.7 }}
//             className="text-lg sm:text-xl md:text-2xl font-light mt-4 drop-shadow-lg text-ivory/90 max-w-2xl mx-auto"
//           >
//             {subtitle}
//           </motion.p>

//           {/* Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full"
//           >
//             {/* Primary Button */}
//             {primaryButtonComponent || (
//               <motion.a
//                 href={primaryButtonLink}
//                 className="relative bg-gold border border-ivory px-6 py-3 rounded-lg text-lg transition w-full sm:w-auto hover:shadow-button-glow"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 {primaryButtonText}
//               </motion.a>
//             )}

//             {/* Secondary Button */}
//             <motion.a
//               href={secondaryButtonLink}
//               className="relative border border-ivory px-6 py-3 rounded-lg text-lg hover:bg-mint hover:text-midnight transition w-full sm:w-auto hover:shadow-button-glow"
//               whileHover={{ scale: 1.05 }}
//             >
//                         {secondaryButtonText}
//           </motion.a>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }

//export default LandingPageHeroSection;

import { motion } from "framer-motion";

function LandingPageHeroSection({ subtitle, primaryButtonText, primaryButtonLink, primaryButtonComponent, secondaryButtonText, secondaryButtonLink }) {
  const heroVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.7 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={heroVariants}
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

      <div className="z-30 text-ivory px-6 max-w-4xl">
        {/* Main Title with enhanced animation */}
        <motion.h1
          variants={textVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          WELCOME TO{" "}
          <span className="hover:text-red-600 transition-colors duration-300">C</span>AL
          <span className="hover:text-red-600 transition-colors duration-300">I</span>F{" "}
          P<span className="hover:text-red-600 transition-colors duration-300">I</span>ERRE
        </motion.h1>

        {/* Subtitle with improved visibility */}
        <motion.p
          variants={textVariants}
          className="text-lg sm:text-xl md:text-2xl font-light mt-4 drop-shadow-lg text-ivory/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* Primary Button */}
          {primaryButtonComponent || (
            <a
              href={primaryButtonLink}
              className="relative bg-gold border border-ivory px-6 py-3 rounded-lg text-lg transition w-full sm:w-auto
              before:absolute before:inset-0 before:bg-ivory before:opacity-0 before:transition-opacity before:hover:opacity-20"
            >
              {primaryButtonText}
            </a>
          )}

          {/* Secondary Button */}
          <a
            href={secondaryButtonLink}
            className="relative border border-ivory px-6 py-3 rounded-lg text-lg hover:bg-mint hover:text-midnight transition w-full sm:w-auto
              before:absolute before:inset-0 before:bg-black before:opacity-0 before:transition-opacity before:hover:opacity-20"
          >
            {secondaryButtonText}
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default LandingPageHeroSection;
