import React, { useState } from "react";

// Navbar Component
const Navbar = () => {
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
        aria-hidden={true}
        onClick={closeNavbar}
        className={`fixed bg-gray-800/40 inset-0 z-30 ${
          navIsOpened ? "lg:hidden" : "hidden lg:hidden"
        }`}
      />
      <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-gray-100 dark:border-b-gray-900 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <a href="/" className="relative flex items-center gap-2.5">
              <span aria-hidden={true} className="flex">
                <span className="w-3 h-6 rounded-l-full flex bg-blue-400" />
                <span className="w-3 h-6 rounded-r-full flex bg-indigo-600 mt-2" />
              </span>
              <span className="inline-flex text-lg font-bold text-indigo-950 dark:text-white">
                Estam
              </span>
            </a>
          </div>
          <div
            className={`absolute top-full left-0 bg-white dark:bg-gray-950 lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6 ${
              navIsOpened
                ? "visible opacity-100 translate-y-0"
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-gray-700 dark:text-gray-300 lg:w-full lg:justify-center">
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                >
                  Company
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-indigo-600"
                >
                  Contact
                </a>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:min-w-max mt-10 lg:mt-0">
              <a
                href="#"
                className="relative flex justify-center px-6 py-3 before:absolute before:inset-0 before:rounded-lg before:transition before:bg-gray-100 dark:before:bg-gray-900 text-indigo-600 dark:text-white hover:before:scale-105"
              >
                <span className="relative">Book a call</span>
              </a>
            </div>
          </div>
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
    </>
  );
};

// HeroSection Component
const HeroSection = () => {
  return (
    <>
      <Navbar />
      <main className="w-full">
        <section className="relative pt-10 xl:pt-14">
          <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
            <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
              <h1 className="text-indigo-950 dark:text-white text-4xl/snug sm:text-6xl/tight lg:text-5xl/tight xl:text-6xl/tight font-semibold">
                Build Your Online Platform with best{" "}
                <span className="bg-indigo-50 dark:bg-gray-900 dark:text-indigo-300 inline-block border border-dashed border-indigo-600 px-3">
                  Digital Agency
                </span>
              </h1>
              <p className="mt-10 text-gray-700 dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos, fugit! Laborum quo maxime at sapiente quasi
              </p>
              <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
                <a
                  href="#"
                  className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-white"
                >
                  Get Started
                </a>
                <a
                  href="#"
                  className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-indigo-600"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none">
              <img
                src="/images/heroImg.webp"
                alt="happy team"
                width={1850}
                height="auto"
                className="lg:absolute w-full lg:inset-x-0 object-cover lg:h-full"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// HomePage Component
function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}

export default HomePage;
