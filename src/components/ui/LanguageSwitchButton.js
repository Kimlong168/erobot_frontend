"use client";
import { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { VscCheck } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
import assets from "@/assets/assets";
import Image from "next/image";
const LanguageSwitchButton = () => {
  const language = "en";

  return (
    <div className="flex items-center gap-2 text-sm">
      <div>
        <FlyoutLink FlyoutContent={AboutContent}>
          <div className="flex items-center justify-center gap-2">
            <Image
              className="min-w-[30px] w-[30px] cursor-pointer"
              src={language == "en" ? assets.usFlag : assets.camFlag}
              alt="flag"
              width={30}
              height={30}
            />
            <span className="xl:inline hidden">
              {language == "en" ? "EN" : "KH"}
            </span>
            <span>
              <IoIosArrowDown />
            </span>
          </div>
        </FlyoutLink>
      </div>
    </div>
  );
};

const FlyoutLink = ({ children, FlyoutContent }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <div className="relative text-white">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-primary-light transition-transform duration-300 ease-out"
        />
      </div>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12  text-black rounded-lg border"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />

            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white">
              <Image
                className="block border  "
                src={assets.kbachkhmer}
                alt="kbachkhmer"
                width={100}
                height={100}
              />
            </div>
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AboutContent = () => {
  const language = "en";
  const setLanguage = () => {};
  return (
    <div
      className={`w-64  bg-neutral-950/90 text-white p-6 shadow-xl rounded-lg  `}
    >
      <div className="mb-3 space-y-3 text-md">
        <div
          onClick={() => {
            setLanguage("kh");
            if (language == "en") {
              localStorage.setItem("language", "kh");
            } else {
              localStorage.setItem("language", "en");
            }
          }}
          className="flex items-center gap-2 cursor-pointer hover:text-primary "
        >
          <Image
            width={30}
            height={30}
            className="min-w-[30px] w-[30px]"
            src={assets.camFlag}
            alt="flag"
          />
          Khmer (KH) {language == "kh" && <VscCheck />}
        </div>
        <div
          onClick={() => {
            setLanguage("en");
            if (language == "en") {
              localStorage.setItem("language", "kh");
            } else {
              localStorage.setItem("language", "en");
            }
          }}
          className="flex items-center gap-2 cursor-pointer hover:text-primary "
        >
          <Image
            width={30}
            height={30}
            className="min-w-[30px] w-[30px] "
            src={assets.usFlag}
            alt="flag"
          />
          English (US) {language == "en" && <VscCheck />}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitchButton;
