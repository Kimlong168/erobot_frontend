"use client";
import assets from "@/assets/assets";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaFacebook,
  FaLine,
  FaPhoneSquareAlt,
  FaTelegram,
} from "react-icons/fa";
import { scrollToTop } from "@/utils/scrollToTop";
import LinkIcon from "../ui/LinkIcon";
import NavLink from "../ui/NavLink";
import NavLinkDropdown from "../ui/NavLinkDropdown";
import Image from "next/image";
import SideBar from "./SideBar";
import { CiLight } from "react-icons/ci";
import { useState } from "react";
import contactInfo from "@/data/contactInfo";
const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const language = "en";

  return (
    <>
      <div className="flex justify-between items-center p-1 px-3 sm:px-6 md:px-8 bg-bakong-red text-white">
        {/* phone number */}
        <div className="flex items-center gap-2">
          <FaPhoneSquareAlt />
          {contactInfo && (
            <Link href={`tel:${contactInfo.phoneNumber}`}>
              {contactInfo.phoneNumber}
            </Link>
          )}
        </div>

        {/* social media icon */}
        <div className="flex item-center gap-3">
          {contactInfo ? (
            contactInfo?.socialMedia?.map((item, index) => (
              <Link href={"/"} key={index}>
                <LinkIcon title={item.title} size={18} />
              </Link>
            ))
          ) : (
            <>
              <Link href="https://www.facebook.com/sorakhmer1">
                <FaFacebook />
              </Link>

              <Link href="https://line.me/ti/p/KqXNVPfm2p">
                <FaLine />
              </Link>

              <Link href="https://t.me/+85512739573">
                <FaTelegram />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* header */}
      <header className="text-primary-content sticky top-0 z-[10] shadow-xl bg-white">
        <nav className="flex justify-between items-center gap-4 sm:gap-5 pl-2 sm:pl-6 md:pl-8 bg-primary-content ">
          {" "}
          {/* logo */}
          <div>
            {language === "en" ? (
              <Link href="/">
                <div className="w-[80px]  md:w-[100px]">
                  <Image
                    src={assets.bigLogo}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
            ) : (
              <Link href="/">
                <div className="w-[80px]  md:w-[100px]">
                  <Image
                    src={assets.logo}
                    alt="khlogo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
            )}
          </div>
          <div
            className="flex justify-center item-center gap-10 md:gap-20 w-full"
            onClick={scrollToTop}
          >
            {/* tab */}
            <ul
              className={`hidden lg:flex justify-center items-center gap-7 xl:gap-10 uppercase font-primary ${
                language !== "en" && "text-lg"
              }`}
            >
              <li className="cursor-pointer">
                <NavLink
                  href="/"
                  title={`${language == "en" ? "Home" : "ទំព័រដើម"}`}
                />
              </li>

              <li className="cursor-pointer">
                <NavLink
                  href="/articles"
                  title={`${language == "en" ? "Articles" : "អត្ថបទ"}`}
                />
              </li>
              <li className="cursor-pointer">
                <NavLink
                  href="/products"
                  title={`${language == "en" ? "Shop" : "ទិញទំនិញ"}`}
                />
              </li>

              <li className="cursor-pointer">
                <NavLink
                  href="/contact"
                  title={`${language == "en" ? "Contact" : "ទំនាក់ទំនង"}`}
                />
              </li>
              <li className="cursor-pointer">
                <NavLinkDropdown />
              </li>
            </ul>
          </div>
          {/* left buttons */}
          <div className="flex items-center justify-end text-xl md:text-2xl h-[80px] lg:h-[85px]">
            <div
              className="px-5 border-l border-primary-content h-full grid place-content-center cursor-pointer"
              onClick={() => setShowSideBar((prev) => !prev)}
            >
              <CiLight className="hidden lg:block" />{" "}
              <IoIosArrowDown className="lg:hidden" />
            </div>
            <div className="px-5 border-l border-primary-content h-full grid place-content-center">
              <Image
                width={30}
                height={30}
                className="min-w-[30px] w-[30px]"
                src={assets.camFlag}
                alt="flag"
              />
            </div>
            <div className="h-full bg-primary grid place-content-center">
              <Link
                href="/donation"
                className=" text-white px-5 xl:px-10 text-2xl font-primary"
              >
                Donate
              </Link>
            </div>
            {/* menu icon */}
            {/* <div
              className="lg:hidden"
              onClick={() => setShowSideBar((prev) => !prev)}
            >
              <HiOutlineMenuAlt3
                size={32}
                className="cursor-pointer text-2xl md:text-3xl hover:text-primary"
              />
            </div> */}
          </div>
        </nav>
      </header>

      <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </>
  );
};

export default Header;
