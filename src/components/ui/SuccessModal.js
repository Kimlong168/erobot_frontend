import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const WarningModal = ({ isOpen, setIsOpen, title, description }) => {
  const language = "en";
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={setIsOpen}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[1000] grid place-items-center  cursor-pointer "
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-green-400 to-green-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            {/* from-violet-600 to-indigo-600 */}
            <FaCheckCircle className="text-white/20 rotate-12 text-[250px] absolute z-0 -top-20 -left-16" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-green-800 grid place-items-center mx-auto">
                <FaCheckCircle />
              </div>
              <div className="text-3xl font-bold text-center mb-2">
                {title ? title : "Success"}
              </div>
              <p className="text-center mb-6">
                {description ? description : ""}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={setIsOpen}
                  className="bg-white hover:opacity-90 transition-opacity text-gray-900 font-semibold w-full py-2 rounded"
                >
                  {language == "en" ? "Understood!" : "យល់ហើយ!"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default WarningModal;
