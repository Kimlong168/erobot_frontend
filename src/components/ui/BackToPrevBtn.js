"use client";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Link from "next/link";
import { scrollToTop } from "@/utils/scrollToTop";

const BackToPrevBtn = ({ link }) => {
  return (
    <Link onClick={scrollToTop} href={link}>
      <button className="font-bold text-secondary border border-secondary px-2 py-1.5  rounded  transition-all gap-2 flex items-center">
        <MdOutlineArrowBackIos /> Back
      </button>
    </Link>
  );
};

export default BackToPrevBtn;
