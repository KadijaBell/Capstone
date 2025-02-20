//import { NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState} from "react";
import { motion } from "framer-motion";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";


function AuthenticatedNav() {
  const user = useSelector((state) => state.session.user);
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Define navigation links with correct paths
  const navLinks = [
    { name: "About", path: "/about-us" },
    { name: "Community", path: "/community" },
    { name: "Agency", path: "/agencies" },
    { name: "Insights", path: "/metrics" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };



  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-black via-midnight to-black text-ivory shadow-lg z-40 py-2 px-6 md:px-8 flex justify-between items-center backdrop-blur-lg transition-all duration-300"
    >

      {/* LOGO */}
      <motion.h1
        className="text-2xl font-extrabold tracking-wide cursor-pointer text-gold hover:text-ivory transition"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        onClick={() => handleNavigate("/")}
      >
        <span className="hover:text-red-600 transition-colors duration-100">C</span>
        AL<span className="hover:text-red-600 transition-colors duration-100">I</span>F
        P<span className="hover:text-red-600 transition-colors duration-100">I</span>ERRE
      </motion.h1>

      {/* DESKTOP NAVIGATION */}
      <div className="hidden md:flex space-x-8 text-lg">
        {!isLandingPage &&
          navLinks.map((link) => (
            <motion.button
              key={link.name}
              onClick={() => handleNavigate(link.path)}
              className={`relative group overflow-hidden hover:text-gold transition duration-300 ${
                location.pathname === link.path ? "text-gold underline" : ""
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </motion.button>
          ))}
      </div>

      {/* AUTH BUTTONS */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <ProfileButton user={user} />
        ) : (

            // isLandingPage && (
            //     <div className="flex space-x-4">
            //       <OpenModalButton
            //         buttonText="Log In"
            //         modalComponent={<LoginFormModal />}
            //         className="relative border border-gold text-gold px-4 py-2 rounded-lg transition duration-300 overflow-hidden group"
            //       >
            //         <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            //         <span className="relative group-hover:text-midnight transition">Log In</span>
            //       </OpenModalButton>
            //       <OpenModalButton
            //         buttonText="Sign Up"
            //         modalComponent={<SignupFormModal />}
            //         className="bg-gold text-midnight px-4 py-2 rounded-lg hover:bg-ivory transition-colors"
            //       />
            //     </div>
            //   )

          <div className="flex space-x-4">
            <OpenModalButton
              buttonText="Log In"
              modalComponent={<LoginFormModal />}
              className="relative border border-gold text-gold px-4 py-2 rounded-lg transition duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              <span className="relative group-hover:text-midnight transition">Log In</span>
            </OpenModalButton>
            {/* <OpenModalButton
              buttonText="Sign Up"
              modalComponent={<SignupFormModal />}
              className="bg-gold text-midnight px-4 py-2 rounded-lg hover:bg-ivory transition-colors"
            /> */}
          </div>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-2xl text-gold"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? "×" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute top-16 left-0 w-full bg-midnight text-ivory p-4 shadow-lg flex flex-col space-y-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigate(link.path)}
              className="text-lg hover:text-gold transition"
            >
              {link.name}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default AuthenticatedNav;
