import React, { useEffect, useState } from "react";

const images = [
  "/assets/capstone-image-1.jpg",
  "/assets/capstone-image-2.jpg",
  "/assets/capstone-image-3.jpg",
  "/assets/capstone-image-4.jpg",
  "/assets/capstone-image-5.jpg",
  "/assets/capstone-image-6.jpg",
  "/assets/capstone-image-7.jpg",
  "/assets/capstone-image-8.jpg",
];

const Insights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen">
      {/* Background image slideshow */}
      <div className="absolute inset-0">
        {images.map((src, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 bg-cover bg-center
              transition-opacity duration-1000 ease-in-out
              ${index === currentIndex ? "opacity-100" : "opacity-0"}
            `}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 py-24 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16 flex flex-col items-center">
          {/* Title and description */}
          <div className="space-y-6 max-w-xl text-center">
            <h1 className="text-3xl font-bold text-ivory capitalize">
              Our Insights
            </h1>
            <p className="text-blush dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              perferendis eos amet eum repudiandae aspernatur mollitia quos
              consectetur voluptatibus pariatur.
            </p>
          </div>

          {/* Centered metrics section with translucent cards and shine effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-10">
            {[
              { value: "12K+", title: "Metric Title 1" },
              { value: "50+", title: "Metric Title 2" },
              { value: "100%", title: "Metric Title 3" },
              { value: "5K+", title: "Metric Title 4" },
            ].map((metric, index) => (
              <div
                key={index}
                className="relative p-4 bg-gray-200/30 rounded-md h-36 w-[110%] flex flex-col justify-center items-center transform transition duration-300 hover:-translate-y-2 hover:scale-[1.1] hover:shadow-lg text-center overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-full group-hover:rotate-12"></div>

                <span className="block font-semibold text-2xl text-mint dark:text-mint">
                  {metric.value}
                </span>
                <h2 className="mt-1 font-medium text-gray-800 dark:text-gray-900">
                  {metric.title}
                </h2>
                <p className="mt-1 text-gray-700 text-sm">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            ))}
          </div>

          {/* "Get in touch" button placed below metrics */}
          <div className="mt-12">
            <a
              href="#"
              className="group relative inline-block px-6 py-3 text-xl font-semibold text-gold hover:text-ivory overflow-hidden"
            >
              {/* Shine effect overlay */}
              <span className="shine absolute inset-0" />
              {/* Button text */}
              <span className="relative">Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
