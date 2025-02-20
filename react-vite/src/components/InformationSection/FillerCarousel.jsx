import { motion } from "framer-motion";

function FillerCarousel() {
  const sections = [
    {
      title: "Who We Are",
      items: [
        { title: "Our Mission", description: "Focusing on Celebrity, Community, and Collection to create cultural impact." },
        { title: "Our Approach", description: "Unique activation concepts and data collection initiatives that drive real results." },
        { title: "Our Focus", description: "Creating sustainability in entertainment markets through innovative solutions." }
      ]
    },
    {
      title: "Our Services",
      items: [
        { title: "Celebrity Engagement", description: "Building authentic connections with audiences through strategic partnerships." },
        { title: "Community Activation", description: "Creating lasting consumer loyalty through meaningful engagement strategies." },
        { title: "Data-Driven Insights", description: "Delivering accurate consumer engagement reports for informed decision making." }
      ]
    },
    {
      title: "What Our Clients Say",
      items: [
        { title: "Sarah & James", description: "Calif Pierre made our dream event a reality!" },
        { title: "Emily T.", description: "Professional and attentive team with top-notch services and really cares about the community." }
      ]
    }
  ];

  return (
    <div className="bg-midnight text-ivory py-20">
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="max-w-7xl mx-auto px-6 mb-32 last:mb-0">
          <div className={`grid ${
            section.title === "What Our Clients Say"
              ? "md:grid-cols-2 max-w-5xl"
              : "md:grid-cols-3"
            } gap-8 mx-auto`}
          >
            {section.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                className="group relative overflow-hidden rounded-lg p-6 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:shadow-lg"
              >
                <div className="relative z-10">
                  <h3 className="text-gold text-lg font-medium mb-3
                    group-hover:translate-x-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-ivory/80 text-sm leading-relaxed mb-4
                    group-hover:translate-x-1 transition-transform duration-300 delay-75">
                    {item.description}
                  </p>
                </div>

                {/* Gradient Border Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300"
                  initial={false}
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(203, 161, 53, 0) 0%, rgba(203, 161, 53, 0.1) 100%)",
                      "linear-gradient(45deg, rgba(203, 161, 53, 0.1) 0%, rgba(203, 161, 53, 0.2) 100%)"
                    ]
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Bottom Highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r
                  from-transparent via-gold/50 to-transparent
                  scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FillerCarousel;
