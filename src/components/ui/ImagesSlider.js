"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { bounceIn } from "@/utils/variants";
import Image from "next/image";

const ImagesSlider = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const sliderRefMoblie = useRef(null);

  const settings = {
    className: "center -mx-10  md:my-0",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
  };

  const mobileSettings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    className: "center container  md:my-0",
  };

  // Function to go to the next slide
  const handleNext = () => {
    sliderRef.current.slickNext();
    sliderRefMoblie.current.slickNext();
  };

  // Function to go to the previous slide
  const handlePrev = () => {
    sliderRef.current.slickPrev();
    sliderRefMoblie.current.slickPrev();
  };
  if (images.length == 0) return null;
  console.log(images);
  return (
    <div>
      {/* tablet and laption */}
      <motion.div
        variants={bounceIn(0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.5 }}
        className="slider-container overflow-hidden p-0 hidden md:block "
      >
        <Slider ref={sliderRef} {...settings}>
          {images.map((slide, index) => (
            <div
              key={index}
              className={`transition-transform duration-500  ${
                index === activeIndex ? "scale-100" : "scale-90"
              }`}
            >
              <div
                style={{
                  backgroundImage: `url(${slide})`,
                }}
                onClick={() => {
                  if (activeIndex + 1 == index || activeIndex == index) {
                    handleNext();
                  } else if (activeIndex - 1 == index) {
                    handlePrev();
                  }
                }}
                className="bg-center bg-cover rounded-lg h-[150px] md:h-[250px] lg:h-[360px] 2xl:h-[500px] flex justify-center items-center"
              ></div>
            </div>
          ))}
        </Slider>
      </motion.div>

      {/* mobile */}

      <motion.div
        variants={bounceIn(0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.5 }}
        className="slider-container overflow-hidden p-0 md:hidden"
      >
        <Slider ref={sliderRefMoblie} {...mobileSettings}>
          {images.map((slide, index) => (
            <div key={index} className={`transition-transform duration-500 `}>
              <div
                style={{
                  backgroundImage: `url(${slide})`,
                }}
                onClick={() => {
                  handleNext();
                }}
                className="bg-center bg-cover rounded-lg h-[250px] flex justify-center items-center"
              ></div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default ImagesSlider;
