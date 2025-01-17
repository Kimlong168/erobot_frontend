"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaX } from "react-icons/fa6";

const PopupImage = ({ image, width, height, className }) => {
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      {showImage ? (
        <div className="relative">
          <div className="fixed inset-0  bg-black/70 z-[1000] flex justify-center items-center p-4">
            <div
              onClick={() => setShowImage(false)}
              className="relative max-w-[500px] max-h-[600px] min-h-[200px] min-w-[200px] overflow-hidden border-2 border-secondary rounded-xl"
            >
              {/* image */}
              <Image
                className="object-fill w-full h-full "
                width={width}
                height={height}
                src={image}
                alt={image}
              />
              {/* icon */}
              <div className="absolute top-1 right-1 cursor-pointer  p-2  rounded-full text-secondary font-bold">
                <FaX />
              </div>
            </div>
          </div>
          <Image
            src={image}
            width={width}
            height={height}
            alt={image}
            className={className}
          />
        </div>
      ) : (
        <Image
          src={image}
          width={width}
          height={height}
          alt={image}
          onClick={() => setShowImage(true)}
          className={className}
        />
      )}
    </>
  );
};

export default PopupImage;
