import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { useState } from "react";
import "./Navigation.css";

function Navigation() {
  const [navIsOpened, setNavIsOpened] = useState(false);

  const toggleNavbar = () => {
    setNavIsOpened((prevState) => !prevState);
  };

  const closeNavbar = () => {
    setNavIsOpened(false);
  };

  return (
    <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-100 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl">
      <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
        {/* Logo */}
        <div className="flex items-center min-w-max">
          <NavLink to="/" className="flex items-center gap-2.5">
            <span aria-hidden={true} className="flex">
              <span className="w-3 h-6 rounded-l-full flex bg-blue-400" />
              <span className="w-3 h-6 rounded-r-full flex bg-indigo-600 mt-2" />
            </span>
            <span className="inline-flex text-lg font-bold text-indigo-950 dark:text-white">
              Estam
            </span>
          </NavLink>
        </div>

        {/* Navbar Links */}
        <div
          className={`absolute top-full left-0 bg-white dark:bg-gray-950 lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6 ${
            navIsOpened
              ? "visible opacity-100 translate-y-0"
              : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
          }`}
        >
          <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
            <li>
              <NavLink
                to="/"
                className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                onClick={closeNavbar}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                onClick={closeNavbar}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                onClick={closeNavbar}
              >
                Signup
              </NavLink>
            </li>
            <li>
              <ProfileButton />
            </li>
          </ul>
        </div>

        {/* Mobile Navbar Toggle Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleNavbar}
            aria-label="toggle navbar"
            className="outline-none border-l border-l-indigo-100 dark:border-l-gray-800 pl-3 relative py-3"
          >
            <span
              aria-hidden={true}
              className={`flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300 ${
                navIsOpened ? "rotate-45 translate-y-[.324rem]" : ""
              }`}
            />
            <span
              aria-hidden={true}
              className={`mt-2 flex h-0.5 w-6 rounded bg-gray-800 dark:bg-gray-300 transition duration-300 ${
                navIsOpened ? "-rotate-45 -translate-y-[.324rem]" : ""
              }`}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
