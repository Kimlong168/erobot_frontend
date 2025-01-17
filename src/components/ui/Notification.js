"use client";
import { useEffect } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const NOTIFICATION_TTL = 1500;

const Notification = ({ text, id, removeNotif, bg }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, [id, removeNotif]);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white pointer-events-auto ${bg}`}
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};



export default Notification;
