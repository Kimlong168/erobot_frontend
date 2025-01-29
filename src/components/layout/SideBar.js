"use client";
import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { scrollToTop } from "@/utils/scrollToTop";
import assets from "@/assets/assets";
import { CiLight } from "react-icons/ci";
import { useThemeContext } from "@/contexts/ThemeContext";

const SideBar = ({ setShowSideBar, showSideBar }) => {
  const { handleThemeSwitch, theme } = useThemeContext();

  return (
    <div
      id="sideBar"
      className={`fixed inset-0 z-[1000] overflow-auto overflow-x-hidden transition-all duration-300 ease-in-out transform bg-neutral-950 ${
        showSideBar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <section className="bg-neutral-950 p-4 md:p-8">
        <div className="mx-auto max-w-5xl " onClick={scrollToTop}>
          <LinkContainer
            heading={"Home"}
            subheading={"Welcome to ERobot Cambodia"}
            imgSrc={assets.whiteLogoNbg}
            href="/"
          />{" "}
          <LinkContainer
            heading={"Articles"}
            subheading={"Read our latest articles"}
            imgSrc={assets.whiteLogoNbg}
            href="/articles"
          />
          <LinkContainer
            heading={"Shop"}
            subheading={"Explore our amazing products for charity"}
            imgSrc={assets.whiteLogoNbg}
            href="/products"
          />
          <LinkContainer
            heading={"Contact"}
            subheading={"In case you want to contact us"}
            imgSrc={assets.whiteLogoNbg}
            href="/contact"
          />
          <LinkContainer
            heading={"About"}
            subheading={"Learn what we do here"}
            imgSrc={assets.whiteLogoNbg}
            href="/about"
          />
          <LinkContainer
            heading={"Members"}
            subheading={"Get to know our team members"}
            imgSrc={assets.whiteLogoNbg}
            href="/members"
          />
          <LinkContainer
            heading={"Projects"}
            subheading={"Explore our projects"}
            imgSrc={assets.whiteLogoNbg}
            href="/projects"
          />
          <LinkContainer
            heading={"Download"}
            subheading={"Download our logo and stickers"}
            imgSrc={assets.whiteLogoNbg}
            href="/download"
          />
          <LinkContainer
            heading={"Cart"}
            subheading={"Go to your shopping cart"}
            imgSrc={assets.whiteLogoNbg}
            href="/cart"
          />
          <div
            onClick={() => {
              setShowSideBar((prev) => !prev);
              handleThemeSwitch();
            }}
            className="text-4xl  text-neutral-500 group hover:text-neutral-50 md:text-6xl mt-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 font-bold">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
              {/* <CiLight className="white" />{" "} */}
            </div>
            <span className="relative z-10 mt-2 block text-base  text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
              Switch to {theme === "dark" ? "light mode 🌞" : "dark mode 🌙"}
            </span>
          </div>
        </div>
      </section>

      {/* close icon */}
      <div
        onClick={() => setShowSideBar((prev) => !prev)}
        className="fixed top-2 right-3 md:top-4 md:right-5 z-[10] p-2 text-white hover:bg-neutral-800"
      >
        <IoMdClose className="w-10 h-10 cursor-pointer" />
      </div>
    </div>
  );
};

const LinkContainer = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <Link href={href} onClick={() => setShowSideBar((prev) => !prev)}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="whileHover"
        className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8"
      >
        <div>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 },
            }}
            transition={{
              type: "spring",
              staggerChildren: 0.075,
              delayChildren: 0.25,
            }}
            className="relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl"
          >
            {heading.split("").map((l, i) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 },
                }}
                transition={{ type: "spring" }}
                className="inline-block"
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </motion.span>
          <span className="relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50">
            {subheading}
          </span>
        </div>

        <motion.div
          style={{
            top,
            left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg" },
            whileHover: { scale: 1, rotate: "12.5deg" },
          }}
          transition={{ type: "spring" }}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        >
          <Image src={imgSrc} width={64} height={48} alt="logo" />
        </motion.div>

        <motion.div
          variants={{
            initial: {
              x: "25%",
              opacity: 0,
            },
            whileHover: {
              x: "0%",
              opacity: 1,
            },
          }}
          transition={{ type: "spring" }}
          className="relative z-10 p-4"
        >
          <FiArrowRight className="text-5xl text-neutral-50" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default SideBar;
