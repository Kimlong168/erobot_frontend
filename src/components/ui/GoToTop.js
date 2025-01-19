"use client";
import { useEffect, useState } from "react";
import { SlArrowUp } from "react-icons/sl";
import { scrollToTopSmooth } from "@/utils/scrollToTop";
const GoToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);

  return (
    <div>
      {showScroll && (
        <div
          onClick={scrollToTopSmooth}
          className="fixed z-10 right-5 bottom-10 rounded-full hover:bg-primary/50 bg-secondary/50 w-[40px] h-[40px] grid place-items-center cursor-pointer"
        >
          <SlArrowUp color="white" />
        </div>
      )}
    </div>
  );
};

export default GoToTop;
