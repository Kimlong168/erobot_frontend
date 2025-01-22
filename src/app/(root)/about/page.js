"use client";
import { motion } from "framer-motion";
import { fadeIn, swing } from "@/utils/variants";
import Image from "next/image";
import assets from "@/assets/assets";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { useRef, useState } from "react";
import PartnersList from "@/components/ui/PartnersList";
const AboutPage = () => {
  const theme = "light";
  const items = [
    {
      name: "Han Leangsiv",
      position: "Co-Founder",
      image: assets.lightLogo,
      link: "https://www.linkedin.com/in/chhouden-chhim-83265a47?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "Suy Kosal",
      position: "Founder",
      image: assets.lightLogo,
      link: "https://www.linkedin.com/in/chem-thida-347b00343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    {
      name: "John Liza",
      position: "Leader",
      image: assets.lightLogo,
      link: "https://www.linkedin.com/in/ngo-kokchor-037698331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ];

  const thisYear = new Date().getFullYear();
  const events = [
    {
      year: "2027",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
    {
      year: "2026",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
    {
      year: "2025",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
    {
      year: "2024",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
    {
      year: "2023",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
    {
      year: "2012",
      title: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum.",
    },
  ];

  const cartoonRef = useRef(null);
  const year2024Ref = useRef(null);
  const [distance, setDistance] = useState(0);

  const calculateDistance = () => {
    if (cartoonRef.current && year2024Ref.current) {
      const cartoonRect = cartoonRef.current.getBoundingClientRect();
      const year2024Rect = year2024Ref.current.getBoundingClientRect();
      setDistance(Math.abs(year2024Rect.top - cartoonRect.top));
    }
  };

  return (
    <main className="md:py-12">
      <section className="container flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-24">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="pt-3 md:w-[90%]"
        >
          <Image
            className="w-full  object-cover shadow-2xl rounded-lg"
            src={assets.heroImage}
            alt="history"
            width={800}
            height={500}
          />
        </motion.div>

        <div className="flex items-end w-full">
          <article className="prose lg:prose-xl text-justify ">
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
              dui. Nullam vel eros sit amet arcu vestibulum.
            </p>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
              dui. Nullam vel eros sit amet arcu vestibulum. lorem ipsum dolor
              sit amet, consectetur adipiscing elit.
            </p>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit
              dui. Nullam vel eros sit amet arcu vestibulum.non elit dui. Nullam
              vel eros sit amet arcu vestibulum.
            </p>
            <p>
              non elit dui. Nullam vel eros sit amet arcu vestibulum.non elit
              dui. Nullam vel eros sit amet arcu vestibulum.
            </p>
          </article>
        </div>
      </section>

      <section className="container flex flex-col sm:flex-row justify-center gap-24 porse lg:prose-xl">
        <motion.div
          variants={fadeIn(
            {
              default: "left",
            },
            0.2,
            "all"
          )}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col items-center gap-8"
        >
          <h3 className="text-nowrap font-primary text-4xl md:text-5xl ">
            Our Mission
          </h3>
          <div className="text-secondary text-[150px]">
            <GoGoal />
          </div>
          <p className="lg:w-[80%] text-center">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          </p>
        </motion.div>
        <motion.div
          variants={fadeIn(
            {
              default: "right",
            },
            0.2,
            "all"
          )}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <h3 className="text-nowrap font-primary text-4xl md:text-5xl ">
            Our Vision
          </h3>
          <div className="text-primary text-[150px]">
            <FaRegEye />
          </div>
          <p className="lg:w-[80%] text-center">
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          </p>
        </motion.div>
      </section>

      <section className="bg-yellow-500/10 w-full mt-12 py-12">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-primary font-bold text-center mb-10 uppercase">
            Our Team
          </h2>
          <div>
            <div className="grid auto-rows-auto grid-cols-2 md:grid-cols-3 gap-5 gap-y-7 md:gap-y-0 lg:gap-12 w-full sm:w-[80%] mx-auto">
              {items.map((item, index) => (
                <motion.div
                  variants={fadeIn(
                    {
                      default: "right",
                      md: index == 0 ? "left" : index == 1 ? "up" : "right", // direction for small screens
                    },
                    0.2,
                    "all"
                  )}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.3 }}
                  key={index}
                  className={`${
                    index === 2
                      ? "w-[48%] md:w-full col-span-2 md:col-span-1 justify-self-center md:justify-self-auto"
                      : "w-full"
                  }`}
                >
                  <div>
                    <div className="w-full h-[200px] sm:h-[300px] md:h-[350px] 2xl:h-[470px]">
                      <Image
                        width={500}
                        height={350}
                        className="w-full h-full object-cover rounded-lg overflow-hidden  shadow"
                        src={item.image}
                        alt={item.index}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="mt-4 font-bold font-primary uppercase text-xl">
                        {item.name}
                      </h3>
                      <div className="text-primary font-semibold mt-3">
                        {item.position}
                      </div>
                      {/* <Link
                        href={item.link}
                        className="flex items-center gap-2 justify-center mt-3 hover:gap-4 transition-all hover:text-primary"
                      >
                        View more <FaArrowRightLong />
                      </Link> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="w-fit mx-auto mt-8">
              <Link
                href="/members"
                className="flex items-center gap-2 bg-white text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg"
              >
                <span>
                  <FaHeart fill="#E1232E" />
                </span>{" "}
                See our members
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-12">
        <h2 className="text-3xl md:text-4xl font-primary font-bold text-center mb-12 uppercase">
          Our Journey
        </h2>
        <motion.div
          variants={swing(0.3)} // Swing animation with delay
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <Image
            width={70}
            height={70}
            ref={cartoonRef}
            className="md:mx-auto"
            src={assets.lightLogo}
            alt="emoji"
          />
        </motion.div>
        {/* h-[760px] sm:h-[750px] lg:h-[660px] xl:h-[700px] */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className={`absolute w-2 bg-secondary h-full md:left-1/2 transform -translate-x-1/2 rounded-lg`}
          ></div>
          <div
            className={`absolute w-2 bg-primary md:left-1/2 transform -translate-x-1/2 rounded-lg`}
            style={{ height: `${distance - 60}px` }}
          ></div>

          {events.map((event, index) => (
            <motion.div
              variants={fadeIn(
                {
                  default: "left",
                  md: "up",
                },
                0.2,
                "all"
              )}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.5 }}
              onAnimationComplete={calculateDistance}
              key={index}
              className="flex md:justify-center md:items-center gap-6 -ml-3 md:ml-0 md:gap-12  w-full "
            >
              {/* Left event content */}
              <motion.div
                variants={fadeIn(
                  {
                    default: "right",
                    // default: "up",
                  },
                  0.2,
                  "all"
                )}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.5 }}
                id={event.year}
                style={{ scrollMarginTop: "180px" }}
                className={`w-5/12 max-w-[400px] cursor-pointer hidden md:block md:${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`bg-white p-6 rounded-xl shadow-lg border hover:border-green-600/50 w-fit ${
                    index % 2 === 0 ? "block" : "block md:hidden"
                  }`}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    <a href={`#${event.year}`}>{event.title}</a>
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 font-semibold leading-8">
                    {event.description}
                  </p>
                </div>
              </motion.div>

              {/* Timeline marker */}
              <div
                ref={event.year == thisYear ? year2024Ref : null}
                className="w-6 h-6  bg-white rounded-full border-[5px] border-secondary shadow-md relative z-2"
              >
                <div
                  className={`absolute z-2 top-0 md:-top-5 text-primary font-semibold   ${
                    index % 2 !== 0
                      ? "-right-16 md:right-14"
                      : "left-10 md:left-14"
                  }`}
                >
                  {event.year}
                </div>
              </div>

              {/* Right event content */}
              <motion.div
                variants={fadeIn(
                  {
                    default: "up",
                    md: "left",
                    // md: "up",
                  },
                  0.2,
                  "all"
                )}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.5 }}
                id={event.year}
                style={{ scrollMarginTop: "180px" }}
                className={`w-full md:w-5/12 max-w-[400px] cursor-pointer my-8 ${
                  events.length == index + 1 && "mb-0"
                } md:my-0  ${
                  index % 2 !== 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                <div
                  className={`bg-white p-6 rounded-xl shadow-lg border hover:border-green-600/50 w-fit ${
                    index % 2 !== 0 ? "block" : "md:hidden"
                  }`}
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    <a href={`#${event.year}`}>{event.title}</a>
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 font-semibold leading-8">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden mt-12">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Our Partners
        </h2>
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
        >
          {theme == "dark" ? (
            <div
              className="w-[130%] my-8 bg-transparent "
              style={{ filter: "brightness(0) invert(1)" }}
            >
              <PartnersList direction={"left"} />
            </div>
          ) : (
            <div className="w-[130%] my-8">
              <PartnersList direction="left" />
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;
