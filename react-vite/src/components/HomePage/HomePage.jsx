import  { useState } from "react";
import Insights from "../Insights/Insights";
import Agencies from "../Agencies/Agencies";
import Masonry from "react-responsive-masonry"

const images =[
  "/assets/capstone-image-1.jpg",
  "/assets/capstone-image-2.jpg",
  "/assets/capstone-image-3.jpg",
  "/assets/capstone-image-4.jpg",
  "/assets/capstone-image-5.jpg",
  "/assets/capstone-image-6.jpg",
  "/assets/capstone-image-7.jpg",
  "/assets/capstone-image-8.jpg",
];


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
      <header className="sticky top-0 w-full flex items-center h-20 border-b border-b-charcoal dark:border-b-ivory z-40 bg-ivory/80 dark:bg-midnight/80 backdrop-filter backdrop-blur-xl">
        <nav className="relative mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex gap-x-5 justify-between items-center">
          <div className="flex items-center min-w-max">
            <a href="/" className="relative flex items-center gap-2.5">
              <span className="inline-flex text-lg font-bold text-charcoal dark:text-ivory">
                Estam
              </span>
            </a>
          </div>
          <div
            className={`absolute top-full left-0 bg-ivory dark:bg-midnight lg:bg-transparent border-b border-gray-200 dark:border-gray-800 py-8 lg:py-0 px-5 sm:px-10 md:px-12 lg:px-0 lg:border-none w-full lg:top-0 lg:relative lg:w-max lg:flex lg:transition-none duration-300 ease-linear gap-x-6 ${
              navIsOpened
                ? "visible opacity-100 translate-y-0"
                : "translate-y-10 opacity-0 invisible lg:visible lg:translate-y-0 lg:opacity-100"
            }`}
          >
            <ul className="flex flex-col lg:flex-row gap-6 lg:items-center text-charcoal dark:text-ivory lg:w-full lg:justify-center">
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="relative py-2.5 duration-300 ease-linear hover:text-gold"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};


const HeroSection = () => {
  return (
    <main className="w-full">
      <section className="relative pt-10 xl:pt-14 bg-midnight text-ivory">
        <div className="mx-auto lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-8 lg:gap-10 xl:gap-12">
          {/* Left Text Section */}
          <div className="mx-auto text-center lg:text-left flex flex-col max-w-3xl justify-center lg:justify-start lg:py-8 flex-1 lg:w-1/2 lg:max-w-none">
            <h1 className="text-ivory dark:text-black text-4xl sm:text-6xl lg:text-5xl xl:text-6xl font-semibold">
              Build Your Online Platform with the best{" "}
              <span className="bg-charcoal dark:bg-black dark:text-gold inline-block border border-dashed border-gold px-3">
                Digital Agency
              </span>
            </h1>
            <p className="mt-10 text-blush dark:text-gray-300 lg:text-lg max-w-2xl lg:max-w-none mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos, fugit! Laborum quo maxime at sapiente quasi.
            </p>
            <div className="mt-10 flex gap-4 justify-center lg:justify-start flex-wrap">
              <a
                href="#"
                className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-ivory dark:text-black"
              >
                Get Started
              </a>
              <a
                href="#"
                className="relative px-6 py-3 before:absolute before:inset-0 before:rounded-lg text-gold"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex flex-1 lg:w-1/2 relative max-w-3xl mx-auto lg:max-w-none overflow-hidden">
            <Masonry columnsCount={4} gutter="1rem">
              {[
                "/assets/capstone-image-1.jpg",
                "/assets/capstone-image-2.jpg",
                "/assets/capstone-image-3.jpg",
                "/assets/capstone-image-4.jpg",
                "/assets/capstone-image-5.jpg",
                "/assets/capstone-image-6.jpg",
                "/assets/capstone-image-7.jpg",
                "/assets/capstone-image-8.jpg",
              ].map((src, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  style={{
                    height: "200px", // Fixed height for all images
                    height: index % 3 === 0 ? "200px" : "155px"

                  }}
                >
                  <img
                    src={src}
                    alt={`Capstone ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </Masonry>
          </div>
        </div>
      </section>
    </main>
  );
};


// export default HeroSection;


// HomePage Component
function HomePage() {
  return (
    <>
      <HeroSection />
      <Insights />
      <Agencies />
    </>
  );
}

export default HomePage;
