"use client";
import { getPartners } from "@/queries/partner";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import { useState, useEffect } from "react";

const PartnersList = ({ direction = "left" }) => {
  const [partnerList, setPartnerList] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const partners = await getPartners();
      setPartnerList(partners);
    };
    fetchPartners();
  }, []);

  if (partnerList.length === 0) return null; //skeleton loader
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

          className="flex justify-between items-center py-3 w-full "
        >
          {partnerList.map((partner, index) => {
            return (
              <div key={index}>
                <Image
                  className="max-w-[100px] md:max-w-[120px] mr-8 md:mr-16 hover:scale-125 rounded-lg cursor-pointer" //80px
                  src={partner.partnerLogo}
                  alt="partner"
                  width={120}
                  height={80}
                />
              </div>
            );
          })}
        </Marquee>
      </div>
    </>
  );
};

export default PartnersList;
