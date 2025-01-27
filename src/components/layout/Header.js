"use client";
import assets from "@/assets/assets";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { scrollToTop } from "@/utils/scrollToTop";
import LinkIcon from "../ui/LinkIcon";
import NavLink from "../ui/NavLink";
import NavLinkDropdown from "../ui/NavLinkDropdown";
import Image from "next/image";
import SideBar from "./SideBar";
import { CiLight } from "react-icons/ci";
import { useState } from "react";
import contactInfo from "@/data/contactInfo";
import { enqueueSnackbar } from "notistack";
import { useThemeContext } from "@/contexts/ThemeContext";
const Header = () => {
  const { handleThemeSwitch } = useThemeContext();
  const [showSideBar, setShowSideBar] = useState(false);

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
          {contactInfo?.socialMedia?.map((item, index) => (
            <Link href={item.url} key={index}>
              <LinkIcon title={item.title} size={18} />
            </Link>
          ))}
        </div>
      </div>

      {/* header */}
      <header className="text-primary-content sticky top-0 z-[10] shadow-xl bg-white ">
        <nav className="flex justify-between items-center gap-4 sm:gap-5 pl-2 sm:pl-6 md:pl-8 bg-primary-content ">
          {" "}
          {/* logo */}
          <div>
            <Link href="/">
              <div className="w-[80px]  md:w-[90px]">
                <Image
                  src={assets.bigLogo}
                  alt="logo"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
          </div>
          <div
            className="flex justify-center item-center gap-10 md:gap-20 w-full"
            onClick={scrollToTop}
          >
            {/* tab */}
            <ul className="hidden lg:flex justify-center items-center gap-7 xl:gap-10 uppercase font-primary text-lg">
              <li className="cursor-pointer">
                <NavLink href="/" title="Home" />
              </li>

              <li className="cursor-pointer">
                <NavLink href="/articles" title="Articles" />
              </li>
              <li className="cursor-pointer">
                <NavLink href="/products" title="Shop" />
              </li>

              <li className="cursor-pointer">
                <NavLink href="/contact" title="Contact" />
              </li>
              <li className="cursor-pointer">
                <NavLinkDropdown />
              </li>
            </ul>
          </div>
          {/* left buttons */}
          <div className="flex items-center justify-end text-xl md:text-2xl h-[80px] lg:h-[85px]">
            <div
              className="hidden px-5 border-l border-primary-content h-full lg:grid place-content-center cursor-pointer"
              onClick={handleThemeSwitch}
            >
              <CiLight />
            </div>
            <div
              className="lg:hidden px-5 border-l border-primary-content h-full grid place-content-center cursor-pointer"
              onClick={() => setShowSideBar(true)}
            >
              <IoIosArrowDown />
            </div>
            <div
              onClick={() => {
                enqueueSnackbar("This feature is currently not available!", {
                  variant: "info",
                });
              }}
              className="px-5 border-l border-primary-content h-full grid place-content-center"
            >
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
                className="text-white px-5 xl:px-10 text-2xl font-primary"
              >
                Donate
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <SideBar setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </>
  );
};

export default Header;
