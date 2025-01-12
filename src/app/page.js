// import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import Image from "next/image";
import assets from "@/assets/assets";
import { FaHeart } from "react-icons/fa";
export default function Home() {
  return (
    <section>
      <div className="relative">
        <Image
          className="w-full object-cover h-[calc(100vh-100px)]"
          src={assets.heroImage}
          alt="hero image"
          width={1200}
          height={800}
        />

        <div className="absolute bottom-5 left-5 right-5 md:bottom-[50px] md:left-[50px] bg-black/10 bg-opacity-10 backdrop-blur-lg rounded-xl shadow-xl p-8 w-fit md:w-[42%] 2xl:w-[30%]">
          <div className=" font-primary text-3xl font-bold text-secondary mb-3 bg-white p-2 rounded text-center md:text-left">
            <TypeAnimation
              speed={50}
              cursor={false}
              sequence={[
                "Make a Difference Today!",
                2000,
                "Your Kindness Can Change Lives!",
                2000,
                "Donate Now and Be the Change!",
                2000,
              ]}
              wrapper="span"
              repeat={Infinity}
            />

            <span className="invisible">I</span>
          </div>
          <p className="text-white">
            Every act of generosity creates a ripple of hope. By contributing to
            our cause, you are not just giving — you are empowering lives,
            building communities, and spreading joy. Join us in making the world
            a better place. Together, we can turn compassion into action.
          </p>
          <div className="flex justify-end w-full ">
            <Link href="/donation">
              <button className="flex items-center gap-2 bg-white text-secondary font-bold py-2.5 px-4 rounded mt-4 ">
                <span>
                  <FaHeart fill="#E1232E" />
                </span>{" "}
                Donate Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
