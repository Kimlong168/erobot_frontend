"use client";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import PartnersList from "@/components/ui/PartnersList";
import LatestArticlesList from "@/components/ui/LatestArticlesList";
import ImpactsList from "@/components/ui/ImpactsList";
import { useInView } from "react-intersection-observer";
import DrawCircleText from "@/components/ui/DrawCircleText";
export default function Home() {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  return (
    <>
      {/* hero section */}
      <section className="relative h-[calc(100vh-100px)] dark:brightness-75 bg-donate bg-cover bg-center mb-12">
        <motion.div
          variants={fadeIn(
            {
              default: "right",
            },
            0.5,
            "all"
          )}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="absolute bottom-5 left-5 right-5 md:bottom-[50px] md:left-[50px] bg-black/10 bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl p-8 md:w-[42%] 2xl:w-[30%]"
        >
          <div className="font-primary text-3xl rounded font-bold text-secondary  dark:text-white mb-3 dark:border border-white bg-white dark:bg-transparent p-2  text-center md:text-left">
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
              <button className="flex items-center rounded gap-2 bg-white dark:bg-transparent dark:border border-white text-secondary dark:text-white/80 font-bold py-3 px-4 mt-4 ">
                <span>
                  <FaHeart />
                </span>{" "}
                Donate Now
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section ref={ref} className="container text-center pb-8 ">
        {/* pb-14 */}
        <h2 className="text-3xl font-primary mb-6 group text-dark dark:text-white/90">
          Our Impact to our community in{" "}
          <span className=" group-hover:text-primary text-secondary">
            Cambodia
          </span>
        </h2>

        <ImpactsList inView={inView} />
        <div className="flex justify-center mt-4">
          <Link href="/projects">
            <button className="flex items-center gap-2  text-secondary border border-secondary dark:text-white/80 dark:border-white font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg">
              <span>
                <FaHeart />
              </span>{" "}
              What We Do?
            </button>
          </Link>
        </div>
      </section>

      <section className="max-w-screen overflow-x-hidden">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Read Our Articles
        </h2>

        <div className="container mt-8 mb-14">
          <div>
            <LatestArticlesList />
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/articles">
              <button className="flex items-center gap-2  text-secondary border border-secondary dark:text-white/80 dark:border-white font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg">
                <span>
                  <FaHeart />
                </span>{" "}
                View More
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden">
        <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
          Our Partners
        </h2>
        <div className="w-[130%] my-8">
          <PartnersList direction="left" />
        </div>
      </section>

      <section className="relative bg-boy dark:brightness-75 bg-cover bg-center h-[500px]  max-w-screen overflow-x-hidden">
        <div className="absolute inset-0 bg-black/50 opacity-50"></div>
        <div className="container relative z-2 h-full grid place-content-center items-center md:gap-12">
          <motion.div
            variants={fadeIn(
              {
                default: "up",
              },
              0.5,
              "all"
            )}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className=" text-4xl md:text-[40px] text-[#eee] font-bold text-center md:text-left md:w-[70%] leading-relaxed">
              {/* Join us in making the world a better place. Together, we can turn
              compassion into action. */}
              <DrawCircleText />
            </h3>
          </motion.div>
        </div>
      </section>
    </>
  );
}
