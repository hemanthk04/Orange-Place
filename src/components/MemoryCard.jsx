import { motion } from "framer-motion";

const MemoryCard = ({ icon, isFlipped, isMatched, onClick }) => {
  return (
    <div
      className={`w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] relative cursor-pointer ${
        isMatched ? "opacity-60 pointer-events-none" : ""
      }`}
      onClick={onClick}
    >
      <motion.div
        className="w-full h-full absolute"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back (default) */}
        <div className="absolute w-full h-full bg-[#E37303] rounded-md backface-hidden"></div>

        {/* Front (icon) */}
        <div className="absolute w-full h-full bg-white rounded-md flex items-center justify-center rotate-y-180 backface-hidden">
          <img src={icon} alt="icon" className="w-24 h-24" />
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryCard;
