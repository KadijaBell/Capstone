const Insights = () => {
  return (
    <section className="py-24 bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-16">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-3xl font-bold text-ivory capitalize">
            Our Insights
          </h1>
          <p className="text-blush dark:text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perferendis eos amet eum repudiandae aspernatur mollitia quos
            consectetur voluptatibus pariatur.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-14 md:items-center">
          <div className="md:w-1/2 md:py-8 grid sm:grid-cols-2 gap-8 md:gap-6 lg:gap-10 text-center text-ivory">
            <div>
              <span className="font-semibold text-xl text-mint dark:text-mint">
                12K+
              </span>
              <h2 className="text-ivory dark:text-gray-200 font-medium">
                Metric Title 1
              </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div>
              <span className="font-semibold text-xl text-mint dark:text-mint">
                50+
              </span>
              <h2 className="text-ivory dark:text-gray-200 font-medium">
                Metric Title 2
              </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 text-center mt-12 md:mt-0">
            <a
              href="#"
              className="text-xl font-semibold text-gold hover:text-ivory"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;
