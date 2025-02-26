import Link from "next/link";
import Image from "next/image";
import assets from "@/assets/assets";
import LinkIcon from "../ui/LinkIcon";
import { PiCopyrightBold } from "react-icons/pi";
import contactInfo from "@/data/contactInfo";
const Footer = () => {
  return (
    <footer className="overflow-hidden dark:bg-dark-mode dark:text-white">
      <div className="bg-white dark:bg-dark-mode ">
        <div className="flex flex-col mx-3 rounded-lg">
          <div className="w-full draggable">
            <div className="container flex flex-col mx-auto">
              <div className="flex flex-col items-center w-full mt-16 mb-5">
                <span className="mb-8">
                  <Image
                    className="w-[120px] dark:invert dark:brightness-0 dark:contrast-200"
                    src={assets.bigLogo}
                    alt="logo"
                    width={120}
                    height={120}
                  />
                </span>
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Home
                    </Link>
                    <Link
                      href="/articles"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Articles
                    </Link>
                    <Link
                      href="/products"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/contact"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      About
                    </Link>
                    <Link
                      href="/projects"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Projects
                    </Link>{" "}
                    <Link
                      href="/cart"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Cart
                    </Link>
                    <Link
                      href="/donation"
                      className="text-gray-600 hover:text-gray-900 dark:text-white/80 dark:hover:text-[#eee]"
                    >
                      Donate
                    </Link>
                  </div>
                  <div className="flex items-center gap-8">
                    {contactInfo.socialMedia.map((social, index) => (
                      <Link
                        key={index}
                        href={social.url}
                        className="text-grey-700 hover:text-grey-900 text-dark hover:text-black dark:text-[#eee] dark:hover:text-white"
                      >
                        <LinkIcon title={social.title} size={24} />
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-base font-normal leading-7 text-center text-grey-700">
                    Made with ❤️💙 for Cambodian Children
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              width={40}
              height={40}
              className="min-w-[40px] w-[40px]"
              src={assets.camFlag}
              alt="flag"
            />
          </div>
        </div>

        <div className="flex flex-wrap mb-5 mt-5 ">
          <div className="w-full max-w-full mx-auto text-center hover:bg-secondary bg-primary">
            <p className="text-sm font-normal leading-7 text-center text-grey-700 text-white">
              <PiCopyrightBold className="inline-block mb-1 " /> 2025 Copyright,
              ERobot Cambodia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
