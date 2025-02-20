import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { motion, AnimatePresence } from "framer-motion";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/");
    closeMenu();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-midnight/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-midnight/10 flex items-center justify-center">
          <FaUserCircle className="text-2xl text-gold" />
        </div>
        {user && <span className="text-ivory text-sm">{user.username}</span>}
      </button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-midnight rounded-xl shadow-elegant overflow-hidden z-50"
              ref={ulRef}
            >
              {user ? (
                <div>
                  <div className="p-4 bg-gradient-to-br from-midnight to-charcoal dark:from-charcoal dark:to-black">
                    <p className="font-semibold text-gold">{user.username}</p>
                    <p className="text-sm text-ivory/80">{user.email}</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        closeMenu();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-3 text-charcoal"
                    >
                      <i className="fas fa-columns text-gold"></i>
                      Dashboard
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="w-full text-left px-4 py-2 text-charcoal dark:text-ivory hover:text-gold flex items-center gap-2"
                    >
                      {isDarkMode ? <FaSun className="text-gold" /> : <FaMoon className="text-gold" />}
                      {isDarkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3 text-red-600"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 space-y-2">
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                    className="w-full text-left px-4 py-2.5 hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-3"
                  />
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                    className="w-full text-left px-4 py-2.5 hover:bg-gold/10 rounded-lg transition-colors flex items-center gap-3"
                  />
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProfileButton;
