
import Insights from "../Insights/Insights";
import Agencies from "../Agencies/Agencies";

import { motion } from "framer-motion";
import HeroSection from "../HeroSection/HeroSection";




//   return (
//     <main className="w-full">
//       <section className="relative pt-10 xl:pt-14 bg-midnight text-ivory">
//         <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
//           {/* Left Text Section */}
//           <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
//             <h1 className="text-ivory dark:text-black text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-semibold">
//               Build Your Online Platform with the best{" "}
//               <span className="bg-charcoal dark:bg-black dark:text-gold inline-block border border-dashed border-gold px-3">
//                 Digital Agency
//               </span>
//             </h1>
//             <p className="mt-10 text-blush dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Dignissimos, fugit! Laborum quo maxime at sapiente quasi.
//             </p>
//             <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
//               <a
//                 href="#"
//                 className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-ivory dark:text-black"
//               >
//                 Get Started
//               </a>
//               <a
//                 href="#"
//                 className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-gold"
//               >
//                 Learn More
//               </a>
//             </div>
//           </div>

//           <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none overflow-hidden">
//             <Masonry columnsCount={4} gutter="1rem">
//               {images.map((src, index) => (
//                 <div
//                   key={index}
//                   className="relative overflow-hidden rounded-lg shadow-lg"
//                   style={{
//                     height: "200px", // Fixed height for all images
//                     height: index % 3 === 0 ? "200px" : "155px"

//                   }}
//                 >
//                   <img
//                     src={src}
//                     alt={`Capstone ${index + 1}`}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
//               ))}
//             </Masonry>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };





// HomePage Component


function HomePage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }} // adjust "amount" as needed
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Insights />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Agencies />
      </motion.div>
    </>
  );
}

export default HomePage;
