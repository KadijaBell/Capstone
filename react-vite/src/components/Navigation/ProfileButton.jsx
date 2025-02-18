import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
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

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

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
        <FaUserCircle className="w-6 h-6 text-gold" />
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
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-elegant overflow-hidden z-50"
              ref={ulRef}
            >
              {user ? (
                <div>
                  <div className="p-4 bg-gradient-to-br from-midnight to-charcoal">
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
