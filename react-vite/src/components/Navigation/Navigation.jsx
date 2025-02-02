import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton"; // This component triggers the modal
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);
  const [navIsOpened, setNavIsOpened] = useState(false);

  const closeNavbar = () => {
    setNavIsOpened(false);
  };

  const toggleNavbar = () => {
    setNavIsOpened((navIsOpened) => !navIsOpened);
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
            <NavLink
              to="/"
              onClick={closeNavbar}
              className="relative flex items-center gap-2.5"
            >
              <span aria-hidden="true" className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-gold" />
                <span className="w-3 h-6 rounded-r-full flex bg-blush mt-2" />
              </span>
              <span className="inline-flex text-lg font-bold text-ivory dark:text-black">
                Estam
              </span>
            </NavLink>
          </div>
          {/* Navigation Links & Authentication Buttons */}
          <div
            className={`absolute top-full left-0 bg-midnight dark:bg-charcoal lg:bg-transparent border-b border-charcoal dark:border-charcoal py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6 ${
              navIsOpened
                ? "visible opacity-100 translate-y-0"
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-ivory dark:text-gray-300 lg:w-full lg:justify-center">
              <li>
                <NavLink
                  exact="true"
                  to="/"
                  onClick={closeNavbar}
                  className="relative py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              {sessionUser ? (
                // If user is logged in, show the profile button.
                <ProfileButton user={sessionUser} />
              ) : (
                // If not, show buttons to open login and signup modals.
                <>
                  <OpenModalButton
                    modalComponent={<LoginFormModal />}
                    buttonText="Log In"
                    onButtonClick={closeNavbar}
                  />
                  <OpenModalButton
                    modalComponent={<SignupFormModal />}
                    buttonText="Sign Up"
                    onButtonClick={closeNavbar}
                  />
                </>
              )}
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
