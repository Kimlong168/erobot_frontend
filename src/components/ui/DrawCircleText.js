// import { motion } from "motion/react";
import { motion } from "framer-motion";
const DrawCircleText = () => {
  return (
    <div className=" text-whtie bg-black/50 px-3 ">
      <h1 className="text-5xl leading-snug">
        Join us in making the world a better place.
        <span className="relative p-2 ">
          Together,
          <svg
            viewBox="0 0 286 73"
            fill="none"
            className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{
                duration: 1.25,
                ease: "easeInOut",
              }}
              d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
              stroke="#FACC15"
              strokeWidth="3"
            />
          </svg>
        </span>{" "}
        we can turn compassion into action.
      </h1>
    </div>
  );
};

export default DrawCircleText;
