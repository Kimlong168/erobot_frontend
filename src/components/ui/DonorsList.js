"use client";
// import Marquee from "react-fast-marquee";
import { useState, useEffect } from "react";
import { getDonors } from "@/queries/donor";
import WordCloudChart from "@/components/ui/WordCloudChart";
const DonorsList = ({ direction = "left" }) => {
  const [donorList, setDonorList] = useState([]);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
      });
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchDonors = async () => {
      const donors = await getDonors();
      console.log("donors", donors);
      setDonorList(donors);
    };
    fetchDonors();
  }, []);

  const data = donorList
    .filter((donor) => donor.name !== "Anonymous")
    .map((donor) => {
      return { text: donor.name, value: donor.amount };
    });

  if (donorList.length === 0) return null; //skeleton loader
  return (
    <section>
      <h2 className="mb-2 text-2xl font-primary bg-secondary hover:bg-primary text-center py-1 text-white">
        Our Donors
      </h2>
      <div className="grid place-content-center">
        <WordCloudChart data={data} width={windowDimensions.width} />
      </div>
    </section>
  );
  // return (
  //   <>
  //     <div className="shadow-2xl border-b border-secondary bg-secondary/10">
  //       <Marquee
  //         // pauseOnClick={true}
  //         pauseOnHover={true}
  //         autoFill={true}
  //         speed={80}
  //         delay={3}
  //         gradient={false}
  //         gradientWidth={0}
  //         direction={direction}
  //         // className="flex justify-between items-center py-3 w-full bg-primary border-[3px] dark:border-white border-black"

  //         className="flex justify-between items-center w-full"
  //       >
  //         {donorList.map((donor, index) => {
  //           return (
  //             <div key={index}>
  //               {donor.name && donor.name !== "Anonymous" ? (
  //                 <div className="pl-5 py-4 capitalize text-dark italic">
  //                   {donor.name}
  //                 </div>
  //               ) : null}
  //             </div>
  //           );
  //         })}
  //       </Marquee>
  //     </div>
  //   </>
  // );
};

export default DonorsList;
