import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation() {
  const [navIsOpened, setNavIsOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNavbar = () => setNavIsOpened(false);

  const handleNavClick = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeNavbar();
    }
  }, []);

  const navigateToPage = useCallback((e, path) => {
    e.stopPropagation(); // Prevent triggering the parent button's onClick
    navigate(path);
    closeNavbar();
  }, [navigate]);

  const navItems = [
    { name: "About Us", sectionId: "about-us", path: "/about-us" },
    { name: "Community", sectionId: "community", path: "/public" },
    { name: "Insights", sectionId: "insights", path: "/metrics" },
    { name: "Agencies", sectionId: "agencies", path: "/agency" }
  ];

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`sticky top-0 w-full flex items-center h-20 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-midnight/95 backdrop-blur-xl shadow-lg"
            : "bg-gradient-to-r from-midnight/95 to-charcoal/95 backdrop-blur-lg"
        }`}
      >
        {/* Enhanced animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-gold/5 to-transparent opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex justify-between items-center">
          {/* Brand & Logo Section */}
          <motion.div
            className="flex flex-col items-start"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              onClick={() => handleNavClick("home")}
              className="cursor-pointer flex items-center gap-2.5 group relative"
            >
              <motion.span
                aria-hidden="true"
                className="flex"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-3 h-6 rounded-l-full flex bg-gold shadow-elegant" />
                <span className="w-3 h-6 rounded-r-full flex bg-blush mt-2 shadow-elegant" />
              </motion.span>
              <span className="text-xl font-bold bg-gradient-to-r from-gold to-blush bg-clip-text text-transparent">
                Calif Pierre
              </span>
              {/* Hover effect */}
              <motion.span
                className="absolute -inset-2 bg-gold/10 rounded-lg -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </a>
            <motion.p
              className="text-xs text-ivory/60 mt-1 ml-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              LEVELINGTHEPLAYINGFIELD
            </motion.p>
          </motion.div>

          {/* Updated Center Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={linkVariants}
                whileHover="hover"
                className="relative group"
              >
                <button
                  onClick={() => handleNavClick(item.sectionId)}
                  className="px-4 py-2 text-ivory/80 hover:text-gold transition-colors relative"
                >
                  {item.name}
                  {/* Add a small "visit page" button */}
                  <button
                    onClick={(e) => navigateToPage(e, item.path)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="sr-only">Visit {item.name} page</span>
                    <span className="text-xs ml-2">↗</span>
                  </button>
                </button>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  className="text-gold hover:text-gold/80 transition-colors text-sm font-medium relative group"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                    className="px-4 py-1.5 rounded-lg bg-gold text-midnight hover:bg-gold/90 transition-colors text-sm font-medium"
                  />
                </motion.div>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/dashboard')}
                className="px-4 py-1.5 rounded-lg bg-gold text-midnight hover:bg-gold/90 transition-colors text-sm font-medium"
              >
                Dashboard
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-between items-center">
            <button
              onClick={() => setNavIsOpened(!navIsOpened)}
              className="text-midnight dark:text-ivory hover:text-gold transition-colors"
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={navIsOpened ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {navIsOpened && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-full left-0 right-0 bg-white/95 dark:bg-midnight/95 backdrop-blur-sm shadow-elegant md:hidden"
            >
              <div className="p-4 space-y-4">
                {navItems.map(item => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="flex flex-col gap-2"
                  >
                    <button
                      onClick={() => handleNavClick(item.sectionId)}
                      className="text-midnight dark:text-ivory hover:text-gold transition-colors text-lg font-medium"
                    >
                      {item.name}
                    </button>
                    <button
                      onClick={(e) => navigateToPage(e, item.path)}
                      className="text-charcoal/60 dark:text-ivory/60 hover:text-gold text-sm"
                    >
                      Visit Page ↗
                    </button>
                  </motion.div>
                ))}

                {/* Auth Buttons */}
                <div className="pt-4 border-t border-midnight/10 dark:border-ivory/10">
                  {!user ? (
                    <div className="space-y-2">
                      <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                        className="block w-full text-center bg-midnight text-gold hover:text-gold/90 transition-colors py-2 rounded-lg"
                        onButtonClick={closeNavbar}
                      />
                      <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                        className="block w-full text-center bg-gold text-midnight hover:bg-gold/90 transition-colors py-2 rounded-lg"
                        onButtonClick={closeNavbar}
                      />
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        closeNavbar();
                      }}
                      className="block w-full text-center bg-gold text-midnight hover:bg-gold/90 transition-colors py-2 rounded-lg"
                    >
                      Dashboard
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Navigation;
