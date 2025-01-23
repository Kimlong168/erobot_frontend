"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import Image from "next/image";
import { getMembers } from "@/queries/member";

const LeaderList = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      const response = await getMembers();
      const data = response.filter(
        (item) =>
          item.position === "Leader" ||
          item.position === "Co-founder" ||
          item.position === "Founder"
      );
      setLeaders(data);
    };
    fetchLeaders();
  }, []);

  if (leaders.length === 0) return null;

  return (
    <>
      {" "}
      {leaders.map((item, index) => (
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
                src={item.profilePicture}
                alt={item.index}
              />
            </div>
            <div className="text-center">
              <h3 className="mt-4 font-bold font-primary uppercase text-xl text-dark">
                {item.fullName}
              </h3>
              <div className="text-dark  mt-3 italic">{item.position}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default LeaderList;
