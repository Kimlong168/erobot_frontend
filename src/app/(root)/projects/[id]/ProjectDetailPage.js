"use client";
import Image from "next/image";
import GoToTop from "@/components/ui/GoToTop";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { MdAccessTime } from "react-icons/md";
import getFormatedDate from "@/utils/getFormatedDate";
import Countdown from "@/components/ui/Countdown";
import ContentDisplay from "@/components/ui/ContentDisplay";
import { FaHeart, FaUsers } from "react-icons/fa";
import ImagesSlider from "@/components/ui/ImagesSlider";
import SharingBtn from "@/components/ui/SharingBtn";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProjectDetailPage = ({ project }) => {
  const totalGoal = project.fundingGoal;
  const raisedAmount = project.fundsRaised;
  const progress = (
    (parseFloat(raisedAmount) / parseFloat(totalGoal)) *
    100
  ).toFixed(2);
  const remainingAmount = totalGoal - raisedAmount;

  const projectImpacts = [
    <>
      {" "}
      <FaUsers className="text-secondary hover:text-primary dark:text-white/90 dark:hover:text-secondary text-[80px] hover:scale-110 transform transition-all" />
      <h3 className="text-3xl font-primary text-dark dark:text-white/80">
        {project.beneficiariesCount}
      </h3>
      <p className=" text-gray-600 dark:text-white/70 capitalize">
        Beneficiaries
      </p>
    </>,
    <>
      {" "}
      <FaHeart className="text-secondary hover:text-primary dark:text-white/90 dark:hover:text-secondary text-[70px] hover:scale-110 transform transition-all" />
      <h3 className="text-3xl font-primary text-dark dark:text-white/80">
        {project.targetGroup}
      </h3>
      <p className=" text-gray-600 dark:text-white/70 capitalize">
        Target Audience
      </p>
    </>,
    <>
      {" "}
      <MdLocationOn className="text-secondary hover:text-primary dark:text-white/90 dark:hover:text-secondary text-[80px] hover:scale-110 transform transition-all" />
      <h3 className="text-3xl font-primary text-dark dark:text-white/80">
        {project.location}
      </h3>
      <p className=" text-gray-600 dark:text-white/70 capitalize">Location</p>
    </>,
  ];

  return (
    <main className="max-w-screen overflow-hidden">
      <section
        style={{
          backgroundImage: `url(${project.coverImage})`,
        }}
        className={`relative bg-cover bg-center h-[calc(100vh-5rem)] dark:brightness-75`}
      >
        <div className="absolute inset-0 bg-black/50 opacity-50"></div>
        <motion.div
          variants={fadeIn(
            {
              default: "up",
            },
            0.3,
            "all"
          )}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="container relative z-2 h-full grid place-content-center items-center md:gap-12  text-white"
        >
          <div className=" text-whtie bg-black/50 p-3">
            <h1 className="text-4xl md:text-5xl leading-relaxed font-bold text-center">
              {project.name}
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 mt-6">
              <div className="flex gap-2 items-center">
                <GrLocation size={20} />
                <span>{project.location}</span>
              </div>
              <div className="flex gap-2 items-center">
                <SlCalender size={18} />
                <span>{getFormatedDate(project.startDate)}</span>
              </div>
              <div className="flex gap-2 items-center capitalize">
                <MdAccessTime size={20} />
                <span>{project.status}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        {/* <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Project Summary
        </h2> */}

        <div className="container">
          <p className="text-md md:text-lg my-8 text-center">
            {project.description}
          </p>

          {/* show countdown for current and upcomming project only */}
          {project.status !== "previous" && (
            <motion.div
              variants={fadeIn(
                {
                  default: "up",
                },
                0.3,
                "all"
              )}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Countdown countdownFrom={project.startDate} />
            </motion.div>
          )}

          <div className="mt-4 mb-8">
            <ContentDisplay htmlString={project.content} />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Donate Now
        </h2>

        <div className="container ">
          <div className="flex flex-col items-center justify-center w-full">
            {/* Donut Chart */}
            <div className="relative w-[250px] h-[250px] md:w-[200px] md:h-[200px] lg:w-[220px] lg:h-[220px] my-6">
              <svg className="w-full h-full">
                <circle
                  className="text-gray-200"
                  strokeWidth="12"
                  stroke="currentColor"
                  fill="transparent"
                  r="80" /* Increased radius */
                  cx="50%"
                  cy="50%"
                />
                <circle
                  className="text-secondary"
                  strokeWidth="12"
                  strokeDasharray="502.4" /* Circumference: 2 * Math.PI * radius (80) */
                  strokeDashoffset={502.4 - (progress / 100) * 502.4}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="80" /* Match increased radius */
                  cx="50%"
                  cy="50%"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-secondary text-3xl">
                  {progress} %
                </span>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              variants={fadeIn(
                {
                  default: "up",
                },
                0.3,
                "all"
              )}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
              className="flex justify-center items-center gap-6 md:gap-16 w-full text-center"
            >
              <div>
                <p className="text-xl font-semibold text-secondary">
                  $ {raisedAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-white/80">
                  RAISED
                </p>
              </div>
              <div className="bg-gray-400 h-14 min-w-[1px] w-[1px]"></div>
              <div>
                <p className="text-xl font-semibold text-tertiary">
                  $ {totalGoal.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-white/80">
                  GOALS
                </p>
              </div>
              <div className="bg-gray-400 h-14 min-w-[1px] w-[1px]"></div>
              <div>
                <p className="text-xl font-semibold text-primary">
                  $ {remainingAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-white/80">LEFT</p>
              </div>
            </motion.div>

            <div className="flex justify-center mt-4">
              <Link href="/donation">
                <button className="flex items-center gap-2 bg-white dark:bg-transparent dark:border-white dark:text-white/90 text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg">
                  <span>
                    <FaHeart />
                  </span>{" "}
                  Donate Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Project Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto mt-12">
          {projectImpacts.map((item, index) => (
            <motion.div
              variants={fadeIn(
                {
                  default: "up",
                },
                0.3 * (index + 1),
                "all"
              )}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
              key={index}
              className="flex flex-col items-center justify-center space-y-4"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Organizers & Co-organizers
        </h2>

        <div className="container">
          <div className="mt-4">
            <p className="text-center text-gray-600 dark:text-white/80  italic ">
              Our Organizers
            </p>
            <div className="flex justify-center items-center gap-8 mt-2">
              <div className="flex flex-wrap justify-center items-center gap-8 mt-2 max-w-screen">
                {project?.organizers.map((item, index) => {
                  return (
                    <motion.div
                      variants={fadeIn(
                        {
                          default: "left",
                        },
                        0.3 * (index + 1),
                        "all"
                      )}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true, amount: 0.3 }}
                      key={index}
                      className="flex-shrink-0"
                    >
                      <Image
                        className="max-w-[120px] md:max-w-[140px] hover:scale-110 transition-transform dark:invert dark:grayscale dark:contrast-200"
                        src={item.partnerLogo}
                        alt={item.partnerName}
                        width={140}
                        height={120}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
          {project?.coOrganizers.length > 0 && (
            <div className="mt-8">
              <p className="text-center text-gray-600 dark:text-white/80  italic">
                Our Co-organizers
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 mt-2 max-w-screen">
                {project?.coOrganizers.map((item, index) => {
                  return (
                    <motion.div
                      variants={fadeIn(
                        {
                          default: "left",
                        },
                        0.3 * (index + 1),
                        "all"
                      )}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true, amount: 0.3 }}
                      key={index}
                      className="flex-shrink-0 "
                    >
                      <Image
                        className="max-w-[100px] md:max-w-[120px] hover:scale-110 transition-transform dark:invert dark:grayscale dark:contrast-200"
                        src={item.partnerLogo}
                        alt={item.partnerName}
                        width={120}
                        height={80}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {project?.volunteers.length > 0 && (
            <div className="mt-8">
              <p className="text-center text-gray-600 dark:text-white/80 italic">
                Our Volunteers
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 mt-6 max-w-screen">
                {project?.volunteers.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 text-dark dark:text-white/90"
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {project?.images.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
            Love & Curiousity
          </h2>
          <div className="mt-8 md:mt-12">
            <ImagesSlider images={project?.images.map((item) => item.url)} />
          </div>
        </section>
      )}

      {/* share button */}

      <div className="py-3 mt-12">
        <div className="container flex flex-col gap-2 items-center">
          <span className="italic text-gray-600 dark:text-white/80 ">
            Share this project:
          </span>
          <SharingBtn
            url={`${baseUrl}/projects/${project.id}`}
            title={project.name}
          />
        </div>
      </div>

      <GoToTop />
    </main>
  );
};

export default ProjectDetailPage;
