"use client";
import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

const ToggleLightDarkMode = () => {
  return (
    <div className={`grid  place-content-center transition-colors `}>
      <SliderToggle />
    </div>
  );
};

const SliderToggle = () => {
  const language = "en";
  const theme = "dark";
  const handleThemeSwitch = (theme) => {
    localStorage.setItem("theme", theme);
  };
  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "light" ? "text-white" : "text-slate-300"
        }`}
        onClick={() => {
          handleThemeSwitch("light");
        }}
      >
        {" "}
        <FiSun className="relative z-10 text-sm " />
        <span className="relative z-10 hidden md:block">
          {language == "en" ? "Light" : <span className="px-1">ភ្លឺ</span>}
        </span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          theme === "dark" ? "text-white" : "text-white"
        }`}
        onClick={() => {
          handleThemeSwitch("dark");
        }}
      >
        <FiMoon className="relative z-10 text-sm " />
        <span className="relative z-10 hidden md:block">
          {language == "en" ? "Dark" : "ងងឹត"}
        </span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-primary-dark"
        />
      </div>
    </div>
  );
};

export default ToggleLightDarkMode;
