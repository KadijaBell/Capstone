import { motion } from "framer-motion";

const fillerInfo = [
  {
    text: "Calif Pierre made our dream community event a reality!",
    author: "Sarah James",
  },
  {
    text: "Their customized planning and top-notch services were amazing.",
    author: "Emily T.",
  },
];

const FillerCarousel = () => {
  return (
    <div className="bg-ivory text-midnight p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
        {fillerInfo.map((fillerInfo, index) => (
          <motion.div
            key={index}
            className="p-4 mb-4 border rounded-lg shadow-lg bg-mint text-charcoal"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <p className="italic mb-2">&quot;{fillerInfo.text}&quot</p>
            <p className="font-semibold">- {fillerInfo.author}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FillerCarousel;
