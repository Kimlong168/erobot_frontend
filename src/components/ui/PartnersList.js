"use client";
import { getPartners } from "@/queries/partner";
import Marquee from "react-fast-marquee";
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
      <div>
        <Marquee
          pauseOnClick={true}
          autoFill={true}
          speed={80}
          delay={3}
          gradient={false}
          gradientWidth={0}
          direction={direction}
          className="flex justify-start items-center py-3 w-full overflow-hidden"
        >
          {partnerList.map((partner, index) => {
            return (
              <div key={index} className="bg-neutral-900b">
                {/* <Image
                  className="max-w-[100px] md:max-w-[120px] mr-8 md:mr-16 hover:scale-125 transition-transform rounded-lg" //80px
                  src={partner.partnerLogo}
                  alt="partner"
                  width={120} // Adjust width to ensure visibility on small screens
                  height={120}
                /> */}
                <div
                  key={index}
                  className="bg-cover bg-center mr-8 md:mr-14 w-[110px] h-[110px] md:w-[120px] md:h-[120px] rounded-lg hover:scale-125 transition-transform dark:invert dark:grayscale dark:contrast-200" // invert brightness-0 contrast-200
                  style={{ backgroundImage: `url(${partner.partnerLogo})` }} // invert brightness-[0.8] sepia-[1] contrast-[1.5] //invert grayscale contrast-200
                ></div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </>
  );
};

export default PartnersList;
