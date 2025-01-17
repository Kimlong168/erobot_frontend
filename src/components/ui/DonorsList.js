"use client";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getDonors } from "@/queries/donor";

const DonorsList = ({ direction = "left" }) => {
  const [donorList, setDonorList] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      const donors = await getDonors();
      console.log("donors", donors);
      setDonorList(donors);
    };
    fetchDonors();
  }, []);

  if (donorList.length === 0) return null; //skeleton loader
  return (
    <>
      <div className="">
        <Marquee
          // pauseOnClick={true}
          pauseOnHover={true}
          autoFill={true}
          speed={80}
          delay={3}
          gradient={false}
          gradientWidth={0}
          direction={direction}
          // className="flex justify-between items-center py-3 w-full bg-primary border-[3px] dark:border-white border-black"

          className="flex justify-between items-center w-full  border-y-2 border-black/90 bg-[#eee]"
        >
          {donorList.map((donor, index) => {
            return (
              <div key={index}>
                {donor.name && donor.name !== "Anonymous" ? (
                  <div className="pl-5 py-4 capitalize font-bold ">
                    {donor.name}
                  </div>
                ) : null}
              </div>
            );
          })}
        </Marquee>
      </div>
    </>
  );
};

export default DonorsList;
