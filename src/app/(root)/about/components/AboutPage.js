"use client";
import { motion } from "framer-motion";
import { fadeIn, swing } from "@/utils/variants";
import Image from "next/image";
import assets from "@/assets/assets";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import Link from "next/link";
import { useRef, useState } from "react";
import PartnersList from "@/components/ui/PartnersList";
import Leader from "@/components/ui/LeaderList";
import Head from "next/head";

const AboutPage = () => {
  const events = [
    {
      year: "2026",
      title: "Continuing Growth and Innovation",
      description: `In 2026, we remain dedicated to advancing our mission of promoting STEM and STEAM education. 
      Our focus will be on exploring new opportunities, fostering collaborations, and finding innovative ways 
      to make a lasting impact in education and the community.`,
    },
    {
      year: "2025",
      title: "Expanding STEM and STEAM Initiatives",
      description: `In 2025, we are planning various activities to promote STEM and STEAM, including charity events, workshops, 
      and engaging community-focused projects. These initiatives aim to foster creativity and innovation among students and 
      educators, bridging the gap between traditional education and hands-on learning.`,
    },
    {
      year: "2024",
      title: "Focusing on Charity and Workshops",
      description: `In 2024, we successfully implemented two impactful projects: one in Preah Vihear Province and another in Siem Reap Province. 
      These projects combined charity and workshops to deliver valuable educational resources and hands-on learning experiences to students in rural area.`,
    },
    {
      year: "2023",
      title: "Expanding Regional Impact",
      description: `In 2023, we strengthened our efforts by completing a 5-month project in Koh Dach with support from 
Transparency International Cambodia and USAID. We partnered with STEM Cambodia for the STEM 
Festival and completed a 3-month project in Kampong Chhnang. A 6-month STEM for Youth program 
was initiated at BVS School in Kampong Chhnang. We also completed a 4-month project in June and 
launched the Ratanakiri Province STEM for Youth initiative, supported by TI, STEM, and GU, running 
from June to November.`,
    },
    {
      year: "2022",
      title: "Building Partnerships",
      description: `In 2022, we focused on building meaningful partnerships with organizations like NICC, CamboJob, TI, 
BVS, PN, and GU to enhance educational outreach. We introduced five specialized courses, continued 
exploring technology in aviation through Air & Tech workshops, participated in the World Robotics 
Olympiad, and strengthened internal capacity to drive impactful learning experiences.`,
    },
    {
      year: "2021",
      title: "Advancing Learning",
      description: `The year 2020 2021 marked significant advancements as we enhanced internal programs, introduced 
seven new courses, and expanded beginner-friendly robotics initiatives. Our workshops integrated 
aerodynamics and technology, and we proudly participated in an international event in Japan to 
showcase our progress.`,
    },
    {
      year: "2020",
      title: "Advancing Learning",
      description: `The year 2020 2021 marked significant advancements as we enhanced internal programs, introduced 
seven new courses, and expanded beginner-friendly robotics initiatives. Our workshops integrated 
aerodynamics and technology, and we proudly participated in an international event in Japan to 
showcase our progress.`,
    },
    {
      year: "2019",
      title: "Expanding Horizons",
      description: `In 2019, we expanded our reach by strengthening internal robotics programs and engaging students in 
hands-on robotics projects. We hosted skill-building workshops, delivered eight educational courses, 
and introduced Mini Robotics to make robotics more accessible to beginners.`,
    },
    {
      year: "2018",
      title: "Laying the Foundations",
      description: `In 2018, we focused on building a strong foundation for STEM education through events like the STEM 
Festival and Insightech, while engaging the community through BarCam discussions. Our efforts 
included mentoring students, launching STEM programs, and collaborating with PN to promote 
innovative learning opportunities.`,
    },
  ];
  const thisYear = new Date().getFullYear();
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
    <>
      {/* meta data */}
      <Head>
        <title>ERobot | About Us</title>
      </Head>
      <main className="py-8 md:py-12 overflow-x-hidden min-w-screen">
        <section className="container flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-24">
          <motion.div
            variants={fadeIn(
              {
                default: "up",
              },
              0.2,
              "all"
            )}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            className="pt-3 md:w-[90%]"
          >
            <Image
              className="w-full  object-cover shadow-2xl rounded-lg"
              src={assets.about}
              alt="history"
              width={800}
              height={500}
            />
          </motion.div>

          <div className="flex items-end w-full">
            <article className="prose lg:prose-xl text-justify dark:text-white/70 ">
              <p>
                Born in 2018, ERobot was found by founder <b>Suy Kosol</b> in
                hopes to bridge the gaps of education in Cambodia through
                teaching, training and team collaborations for children and
                youth, especially in rural areas.
              </p>
              <p>
                From then on ERobot went through 2 major transition. The first
                transition starts from 2018 - 2023 and the second transition
                started from 2024 - Present.
              </p>
              <p>
                Despite our visions and mission remaining the same, we focused
                more on the project <b>“PonLok Komnitˮ</b> which aim to create
                short-term event by going to the provinces, donate and give
                short workshops to youth to harnest and gain new mindsets,
                opportunities and memories.
              </p>
            </article>
          </div>
        </section>

        <section className="container flex flex-col sm:flex-row justify-center gap-20 md:gap-24 porse lg:prose-xl pt-12 md:pt-8">
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
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <h3 className="text-nowrap font-primary text-3xl md:text-4xl text-dark dark:text-white/90">
              Our Mission
            </h3>
            <div className="text-secondary text-[150px]">
              <GoGoal />
            </div>
            <p className="lg:w-[80%] text-center dark:text-white/70">
              Bridge gaps, inspire leaders, and empower change-makers through
              education and collaboration.
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
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center gap-8"
          >
            <h3 className="text-nowrap font-primary text-3xl md:text-4xl text-dark dark:text-white/90">
              Our Vision
            </h3>
            <div className="text-secondary text-[150px]">
              <FaRegEye />
            </div>
            <p className="lg:w-[80%] text-center dark:text-white/70">
              Inspire innovation, foster compassion, and empower through
              education for a better world.
            </p>
          </motion.div>
        </section>

        <section className="bg-yellow-500/10l w-full mt-8 pt-12">
          <div className="">
            {/* <h2 className="text-3xl md:text-4xl font-primary font-bold text-center mb-10 uppercase">
            Our Team
          </h2> */}
            <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white mb-12">
              Our Team
            </h2>
            <div className="container">
              <div className="grid auto-rows-auto grid-cols-2 md:grid-cols-3 gap-5 gap-y-7 md:gap-y-0 lg:gap-12 w-full sm:w-[80%] mx-auto">
                <Leader />
              </div>
              <div className="w-fit mx-auto mt-8">
                <Link
                  href="/members"
                  className="flex items-center gap-2 bg-white dark:bg-transparent dark:text-white dark:border-white text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full hover:shadow-lg"
                >
                  <span>
                    <FaHeart />
                  </span>{" "}
                  Our Members
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          {/* <h2 className="text-3xl md:text-4xl font-primary font-bold text-center mb-12 uppercase">
          Our Journey
        </h2> */}
          <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white mb-10">
            Our Journey
          </h2>
          <div className="container">
            {" "}
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
                className="md:mx-auto dark:invert dark:brightness-0 dark:contrast-200"
                src={assets.lightLogoNbg}
                alt="emoji"
              />
            </motion.div>
            {/* h-[760px] sm:h-[750px] lg:h-[660px] xl:h-[700px] */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div
                className={`absolute w-2 bg-bakong-red h-full md:left-1/2 transform -translate-x-1/2 rounded-lg`}
              ></div>
              <div
                className={`absolute w-2 bg-[#eee] md:left-1/2 transform -translate-x-1/2 rounded-lg`}
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
                      className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border hover:border-secondary/50 dark:hover:border-secondary w-fit ${
                        index % 2 === 0 ? "block" : "block md:hidden"
                      }`}
                    >
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
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
                    className="w-6 h-6  bg-white rounded-full border-[5px] border-tertiary shadow-md relative z-2"
                  >
                    <div
                      className={`absolute z-2 top-0 md:-top-5 font-semibold  ${
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
                      className={`bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border hover:border-secondary/50 dark:hover:border-secondary w-fit ${
                        index % 2 !== 0 ? "block" : "md:hidden"
                      }`}
                    >
                      <h2 className="text-xl font-semibold text-dark dark:text-white/90">
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
          </div>
        </section>

        <section className="overflow-hidden mt-12">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div>
              <PartnersList direction="left" />
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
