"use client";
import { scrollToTopSmooth } from "@/utils/scrollToTop";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const ItemCartQuantity = ({ number }) => {
  if (number == 0) return null;
  return (
    <div className="relative">
      <Link
        href="/cart"
        onClick={scrollToTopSmooth}
        className="fixed z-[100] right-10 bottom-10 rounded-full bg-yellow-500 w-[40px] h-[40px] grid place-items-center cursor-pointer"
      >
        <div className="absolute -top-1.5 -right-1.5 text-white bg-bakong-red grid place-content-center rounded-full w-[20px] h-[20px] text-xs animate-bounce">
          {number}
        </div>
        <FaShoppingCart fill="white" size="22" />
      </Link>
    </div>
  );
};

export default ItemCartQuantity;
