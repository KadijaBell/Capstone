// //import { NavLink} from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// //import { motion } from "framer-motion";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";


// function Navigation() {
//   const user = useSelector((state) => state.session.user);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isLandingPage = location.pathname === "/";
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   // const navLinkVariants = {
//   //   hover: {
//   //     scale: 1.1, color: "##FF6F61",
//   //   }
//   // };

//   // const navVariants = {
//   //   hidden: { opacity: 0, y: -50 },
//   //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   // };

// //   return (
// //     <motion.nav
// //     initial="hidden"
// //       animate="visible"
// //       variants={navVariants}
// //        className="nav-container flex items-center justify-between bg-gray-800 text-white py-4 px-8 shadow-lg"
// //     >
// //       <h1 className="text-2xl font-bold">Calif Pierre</h1>
// //       <ul className="flex gap-6">
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <NavLink to="/" className="hover:text-gray-300" activeclassname="active">
// //             Home
// //           </NavLink>
// //       </motion.li>
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <NavLink to="/" className="hover:text-gray-300" activeclassname="active">
// //             About Us
// //           </NavLink>
// //       </motion.li>
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <NavLink to="/community" className="hover:text-gray-300" activeclassname="active">
// //             Community
// //           </NavLink>
// //       </motion.li>
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <NavLink to="/agency" className="hover:text-gray-300" activeclassname="active">
// //             Agency
// //           </NavLink>
// //       </motion.li>
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <NavLink to="/metrics" className="hover:text-gray-300" activeclassname="active">
// //             Insights
// //           </NavLink>
// //       </motion.li>
// //       <motion.li variants={navLinkVariants} whileHover="hover">
// //           <ProfileButton />
// //       </motion.li>
// //       </ul>
// //     </motion.nav>
// //   );
// // }

// const handleNavigate = (path) => {
//   navigate(path);
//   setShowMobileMenu(false); // Close mobile menu after navigation
// };

// console.log("Current user in Navigation:", user); // Debug log

// return (
//   <nav className="bg-midnight text-ivory p-4 flex flex-col md:flex-row justify-between items-center relative">
//     {/* Logo and Mobile Menu Button */}
//     <div className="w-full md:w-auto flex justify-between items-center">
//       <h1 className="text-xl font-bold cursor-pointer" onClick={() => handleNavigate("/")}>
//         Calif Pierre
//       </h1>
//       <button
//         className="md:hidden text-2xl text-ivory"
//         onClick={() => setShowMobileMenu(!showMobileMenu)}
//       >
//         {showMobileMenu ? '×' : '☰'}
//       </button>
//     </div>

//     {/* Desktop Navigation */}
//     <div className="hidden md:flex items-center space-x-6">
//       {!isLandingPage && (
//         <>
//           <button
//             onClick={() => handleNavigate("/about-us")}
//             className="relative hover:text-gold transition-colors duration-300 group"
//           >
//             About
//             <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//           </button>
//           <button onClick={() => handleNavigate("/community")} className="hover:text-gold transition">Community</button>
//           <button onClick={() => handleNavigate("/agencies")} className="hover:text-gold transition">Agency</button>
//           <button onClick={() => handleNavigate("/metrics")} className="hover:text-gold transition">Insights</button>
//         </>
//       )}
//     </div>

//     {/* Desktop Auth Buttons */}
//     <div className="hidden md:flex items-center space-x-4">
//       {user ? (
//         <div className="flex items-center space-x-4">
//           <ProfileButton user={user} />
//         </div>
//       ) : (
//         isLandingPage && (
//           <div className="flex space-x-4">
//             <OpenModalButton
//               buttonText="Log In"
//               modalComponent={<LoginFormModal />}
//               className="text-gold hover:text-ivory transition-colors"
//             />
//             <OpenModalButton
//               buttonText="Sign Up"
//               modalComponent={<SignupFormModal />}
//               className="bg-gold text-midnight px-4 py-2 rounded hover:bg-ivory transition-colors"
//             />

//            </div>
//         )
//       )}
//     </div>

//     {/* Mobile Menu */}
//     {showMobileMenu && (
//       <div className="md:hidden w-full absolute top-full left-0 bg-midnight z-50 py-4 px-6 shadow-lg">
//         <div className="flex flex-col space-y-4">
//           {!isLandingPage && (
//             <>
//               <button
//                 onClick={() => handleNavigate("/about-us")}
//                 className="relative hover:text-gold transition-colors duration-300 group"
//               >
//                 About
//                 <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
//               </button>
//               <button onClick={() => handleNavigate("/community")} className="hover:text-gold transition text-left">Community</button>
//               <button onClick={() => handleNavigate("/agency")} className="hover:text-gold transition text-left">Agency</button>
//               <button onClick={() => handleNavigate("/insights")} className="hover:text-gold transition text-left">Insights</button>
//             </>
//           )}

//           {user ? (
//             <>
//               <div className="pt-2">
//                 <ProfileButton user={user} />
//               </div>
//             </>
//           ) : (
//             isLandingPage && (
//               <div className="flex flex-col space-y-3">
//                 <OpenModalButton
//                   buttonText="Log In"
//                   modalComponent={<LoginFormModal />}
//                   className="bg-transparent border border-gold text-gold hover:bg-gold hover:text-midnight px-4 py-2 rounded-full transition duration-300 w-full"
//                 />
//                 <OpenModalButton
//                   buttonText="Sign Up"
//                   modalComponent={<SignupFormModal />}
//                   className="bg-gold text-midnight hover:bg-ivory px-4 py-2 rounded-full transition duration-300 w-full"
//                 />
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     )}
//   </nav>
// );
// }

// export default Navigation;
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton"; // This component triggers the modal
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useState } from "react";
import { useSelector } from "react-redux";


function Navigation() {
  const [navIsOpened, setNavIsOpened] = useState(false);

  const closeNavbar = () => setNavIsOpened(false);
  const toggleNavbar = () => setNavIsOpened((prev) => !prev);

  // Function to scroll to a section with a matching id
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeNavbar();
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeNavbar}
        className={`fixed bg-black/50 inset-0 z-30 ${
          navIsOpened ? "lg:hidden" : "hidden lg:hidden"
        }`}
      />
      <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-charcoal z-40 bg-midnight/80 dark:bg-charcoal/80 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          {/* Brand & Home Link */}
          <div className="flex items-center min-w-max">
            <a
              onClick={() => scrollToSection("home")}
              className="cursor-pointer relative flex items-center gap-2.5"
            >
              <span aria-hidden="true" className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-gold" />
                <span className="w-3 h-6 rounded-r-full flex bg-blush mt-2" />
              </span>
              <span className="inline-flex text-lg font-bold text-ivory dark:text-black">
                Calif Pierre
              </span>
            </a>
          </div>

          {/* Navigation Links */}
          <div
            className={`absolute top-full left-0 bg-midnight dark:bg-charcoal lg:bg-transparent border-b border-charcoal dark:border-charcoal py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6 ${
              navIsOpened
                ? "visible opacity-100 translate-y-0"
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-ivory dark:text-gray-300 lg:w-full lg:justify-center">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="cursor-pointer py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("agencies")}
                  className="cursor-pointer py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Agencies
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("insights")}
                  className="cursor-pointer py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Insights
                </button>
              </li>
            </ul>

            {/* Authentication Buttons (if needed) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              {/* Insert authentication buttons here */}
            </div>
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleNavbar}
              aria-label="toggle navbar"
              className="outline-none border-l border-l-charcoal pl-3 relative py-3"
            >
              <span
                aria-hidden="true"
                className={`flex h-0.5 w-6 rounded bg-charcoal dark:bg-ivory transition duration-300 ${
                  navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""
                }`}
              />
              <span
                aria-hidden="true"
                className={`mt-2 flex h-0.5 w-6 rounded bg-charcoal dark:bg-ivory transition duration-300 ${
                  navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navigation;
