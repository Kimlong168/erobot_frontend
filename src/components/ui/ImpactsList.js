"use client";
import { useEffect, useState } from "react";
import { getImpactsInfo } from "@/queries/impact";
import CountUp from "react-countup";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdVolunteerActivism } from "react-icons/md";
import { IoHeartCircle } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
const impactData = [
  {
    icon: <FaUsers />,
    number: "0",
    text: "participants reached",
  },
  {
    icon: (
      <IoHeartCircle className=" text-[82px] hover:scale-110 transform transition-all" />
    ),
    number: "0",
    text: "projects completed",
  },
  {
    icon: <RiMoneyDollarCircleFill />,
    number: "0",
    text: "fund raised",
  },
  {
    icon: <MdVolunteerActivism />,
    number: "0",
    text: "members of the team",
  },
];

const ImpactsList = ({ inView }) => {
  const [info, setInfo] = useState(impactData);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await getImpactsInfo();
      setInfo([
        {
          icon: <FaUsers />,
          number: info.numberOfParticipants,
          text: "participants reached",
        },
        {
          icon: (
            <IoHeartCircle className=" text-[82px] hover:scale-110 transform transition-all" />
          ),
          number: info.numberOfProjects,
          text: "projects completed",
        },
        {
          icon: <RiMoneyDollarCircleFill />,
          number: info.amountOfDonations,
          text: "fund raised",
        },
        {
          icon: <MdVolunteerActivism />,
          number: info.numberOfMembers,
          text: "members of the team",
        },
      ]);
    };
    fetchInfo();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-6xl mx-auto">
        {info.map((item, index) => (
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
            <div className="text-secondary hover:text-primary dark:text-white dark:hover:text-secondary text-[80px] hover:scale-110 transform transition-all">
              {item.icon}
            </div>

            <h3 className="text-4xl font-primary text-dark dark:text-white ">
              {inView ? (
                <>
                  {" "}
                  {item.number != "0" ? (
                    <CountUp end={item.number} duration={3} />
                  ) : (
                    "0"
                  )}
                </>
              ) : (
                "0"
              )}
            </h3>
            <p className=" text-gray-600 dark:text-[#eee] capitalize">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ImpactsList;
