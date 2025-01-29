const Agencies = () => {
  return (
    <section className="py-24 bg-midnight">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 relative">
        <div className="bg-ivory dark:bg-midnight flex flex-col items-center md:flex-row md:justify-between gap-8 p-12 rounded-xl md:items-start text-center md:text-left">
          <div className="max-w-xl space-y-3">
            <h1 className="text-3xl font-semibold text-charcoal dark:text-ivory">
              Ready to take your skills to the moon
            </h1>
            <p className="text-charcoal dark:text-ivory">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="bg-charcoal dark:bg-ivory text-ivory dark:text-charcoal px-5 py-2.5 rounded-lg transition duration-300 ease-linear hover:bg-gold hover:text-black"
            >
              Read doc
            </a>
            <a
              href="#"
              className="bg-gold text-black px-5 py-2.5 rounded-lg transition duration-300 ease-linear hover:bg-blush hover:text-black"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
      <div className="pt-32 -mt-16 bg-charcoal dark:bg-midnight" />
    </section>
  );
};
export default Agencies;
