"use client";
import assets from "@/assets/assets";
import { LuDownload } from "react-icons/lu";
import PopupImage from "@/components/ui/PopupImage";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const DownloadPage = ({ stickers }) => {
  const LOGO_LIGHT_URL = baseUrl + "/images/light.png";
  const LOGO_DARK_URL = baseUrl + "/images/dark.png";
  const LOGO_WHITE_URL = baseUrl + "/images/white.png";

  const downloadFileAtURL = async (url) => {
    try {
      const response = await fetch(url, { mode: "cors" }); // Fetch the file
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const blob = await response.blob(); // Convert the response to a Blob
      const fileName = url.split("/").pop(); // Extract the file name

      // Create a temporary download link
      const aTag = document.createElement("a");
      aTag.href = URL.createObjectURL(blob); // Convert Blob to Object URL
      aTag.setAttribute("download", fileName); // Set the file name for download
      document.body.appendChild(aTag);
      aTag.click(); // Trigger the download
      aTag.remove(); // Clean up
      URL.revokeObjectURL(aTag.href); // Free up memory
      console.log(`Download started for: ${fileName}`);
    } catch (error) {
      console.error("Download failed:", error.message);
    }
  };

  console.log(stickers);

  const logos = [
    {
      title: "Light Logo",
      url: LOGO_LIGHT_URL,
      image: assets.lightLogo,
    },
    {
      title: "Dark Logo",
      url: LOGO_DARK_URL,
      image: assets.darkLogo,
    },

    {
      title: "White Logo",
      url: LOGO_WHITE_URL,
      image: assets.whiteLogo,
    },
  ];
  return (
    <main className="container py-8 md:py-12">
      <section className="mb-12">
        <h3 className="text-center md:text-left  text-nowrap font-primary text-3xl md:text-4xl text-dark dark:text-white/90 mb-4">
          Our Brand Story
        </h3>
        <motion.p
          variants={fadeIn(
            {
              default: "left",
            },
            0.3,
            "all"
          )}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
          className="text-md lg:text-[17px] text-justify dark:text-white/70 text-dark"
        >
          Founded in 2018 by Suy Kosol, ERobot aims to bridge educational gaps
          in Cambodia by offering teaching, training, and collaboration for
          youth, especially in rural areas. It strives to equip young Cambodians
          with skills for a tech-driven future, becoming a symbol of innovation
          and progress.
          <br />
          <br />
          The ERobot Cambodia brand is our most valuable asset, representing our
          passion for excellence, creativity, and commitment to advancing
          education. It defines who we are, what we do and serves as a powerful
          symbol of our values and aspirations.
          <br />
          <br />
          We provide access to our official logos, updated in 2024, to ensure a
          consistent and impactful representation of our brand. This enables
          everyone to use our latest branding elements appropriately when
          engaging with diverse audiences in an ever-evolving technological
          landscape.
        </motion.p>
      </section>

      <section className="mb-12">
        <h3 className=" text-center md:text-left  text-nowrap font-primary text-3xl md:text-4xl text-dark dark:text-white/90 mb-4">
          Our Logos
        </h3>
        <div className="flex flex-col md:flex-row gap-4 max-w-screen overflow-x-hidden">
          {logos.map((logo, index) => (
            <div key={index}>
              <motion.div
                variants={fadeIn(
                  {
                    default: "left",
                  },
                  0.3 * (index + 1),
                  "all"
                )}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.3 }}
                className="w-[calc(100vw-200px)] mx-auto  md:w-[200px] md:h-[200px] overflow-hidden rounded-lg border border-gray-400"
              >
                <PopupImage
                  image={logo.image}
                  className=" w-full h-full object-cover hover:scale-110 transition-transform"
                  width={400}
                  height={400}
                />
              </motion.div>

              <button
                onClick={() => downloadFileAtURL(logo.url)}
                className="mt-2 w-[calc(100vw-200px)] mx-auto  md:w-full flex justify-center items-center gap-3 px-3 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-secondary "
              >
                <LuDownload /> Download
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-center md:text-left text-nowrap font-primary text-3xl md:text-4xl text-dark dark:text-white/90 mb-4">
          Our Stickers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 max-w-screen overflow-x-hidden">
          {stickers?.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn(
                {
                  default: "left",
                },
                0.3,
                "all"
              )}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
              className="w-[calc(100vw-200px)] md:w-[200px] md:h-[200px] mx-auto mt-4 md:mt-0" // mb-12
            >
              <PopupImage
                image={item.url}
                className=" w-full h-full object-cover hover:scale-110 transition-transform"
                width={400}
                height={400}
              />
              {/* <Link
                href={item.url}
                className="mt-2 w-full flex justify-center items-center gap-3
                px-3 py-2.5 bg-blue-600 text-white font-medium text-sm
                rounded-lg hover:bg-secondary "
              >
                <LuDownload /> Download
              </Link> */}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default DownloadPage;
