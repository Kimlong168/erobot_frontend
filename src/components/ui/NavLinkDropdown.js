"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import assets from "@/assets/assets";
import Image from "next/image";
// drop down link in the navigation bar with the underline animation
const NavLinkDropdown = () => {
  const language = "en";
  return (
    <div className="flex justify-center font-primary text-xl ">
      <FlyoutLink FlyoutContent={AboutContent}>
        {language == "en" ? "About" : "អំពីយើង"}
      </FlyoutLink>
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
      <div className="relative text-dark hover:text-black">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-secondary transition-transform duration-300 ease-out"
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
            className="absolute left-1/2 top-12  rounded-lg border"
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
  return (
    <div
      className={`w-64  bg-white text-dark hover:text-black p-6 shadow-xl rounded-lg  border text-lg font-semibold font-secondary capitalize`}
    >
      <div className="mb-3 space-y-3">
        <Link
          href="/about"
          className="group hover:underline hover:text-primary flex items-center gap-2 italic"
        >
          <div className="hidden group-hover:block h-2 w-2 rotate-45  ">
            <Image
              className="block"
              src={assets.kbachkhmer}
              alt="kbachkhmer"
              width={100}
              height={100}
            />
          </div>
          {language == "en" ? "Organization" : "អំពីយើង"}
        </Link>
        <Link
          href="/members"
          className="group hover:underline hover:text-primary flex items-center gap-2 italic"
        >
          <div className="hidden group-hover:block h-2 w-2 rotate-45  ">
            <Image
              className="block"
              src={assets.kbachkhmer}
              alt="kbachkhmer"
              width={100}
              height={100}
            />
          </div>
          {language == "en" ? "Members" : "ដំណើរការផលិត"}
        </Link>{" "}
        <Link
          href="/projects"
          className="group hover:underline hover:text-primary flex items-center gap-2 italic"
        >
          <div className="hidden group-hover:block h-2 w-2 rotate-45  ">
            <Image
              className="block"
              src={assets.kbachkhmer}
              alt="kbachkhmer"
              width={100}
              height={100}
            />
          </div>
          {language == "en" ? "Projects" : "ដំណើរការផលិត"}
        </Link>
        <Link
          href="/download"
          className="group hover:underline hover:text-primary flex items-center gap-2 italic"
        >
          <div className="hidden group-hover:block h-2 w-2 rotate-45  ">
            <Image
              className="block"
              src={assets.kbachkhmer}
              alt="kbachkhmer"
              width={100}
              height={100}
            />
          </div>
          {language == "en" ? "Download" : "រោងចក្រផលិត"}
        </Link>
      </div>
    </div>
  );
};

export default NavLinkDropdown;
