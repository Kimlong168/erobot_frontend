"use client";

import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Countdown from "../ui/Countdown";
const COLORS_TOP = [
  "#0330a3",
  "#de0025",
  "#fbb80f",
  "#13FFAA",
  "#1E67C6",
  "#CE84CF",
  "#DD335C",
];

const ComingSoon = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-8 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <div>
          <Image
            src="/images/whiteLogoNbg.png"
            width={200}
            height={200}
            className="w-[200px]"
            alt="ERobot Cambodia Logo"
          />
        </div>
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm -mt-5">
          ERobot Cambodia
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Coming Soon!
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Our website is currently under construction. Stay tuned for updates
          and check back soon! 🚀
        </p>

        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          <Link target="_blank" href="https://web.facebook.com/ERobotCambodia">
            For more information
          </Link>
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
      <div className="rounded-full overflow-hidden mt-12 shadow-2xl border-2 border-secondary">
        <Countdown className="text-white text-md" countdownFrom="2025-02-20" />
      </div>
    </motion.section>
  );
};

export default ComingSoon;
