"use client";
import assets from "@/assets/assets";
import { LuDownload } from "react-icons/lu";
import Image from "next/image";
import PopupImage from "@/components/ui/PopupImage";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const DownloadPage = () => {
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
        <h3 className="text-nowrap font-primary text-3xl md:text-4xl text-dark mb-4">
          Brand Information
        </h3>
        <p className="text-justify">
          Brand Information ERobot Cambodia is a leading innovator in robotics
          and technology education, dedicated to empowering the next generation
          of problem-solvers and creative thinkers in Cambodia. With a vision to
          inspire and equip Cambodian youth with the skills necessary for a
          tech-driven future, ERobot Cambodia stands as a symbol of innovation,
          education, and progress in the nation.
          <br />
          <br />
          The ERobot Cambodia brand is our most valuable asset, representing our
          passion for excellence, creativity, and commitment to advancing
          technology education. It defines who we are and what we do as pioneers
          in nurturing a tech-savvy society.
          <br />
          <br />
          This brand guide ensures that all elements of our identity work
          cohesively to communicate a unified and impactful image. As we address
          a diverse audience in a dynamic technological landscape, it is
          essential to convey a consistent and compelling voice in every aspect
          of our communications and operations.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-nowrap font-primary text-3xl md:text-4xl text-dark mb-4">
          Logos
        </h3>
        <div className="flex flex-col md:flex-row gap-4">
          {logos.map((logo, index) => (
            <div key={index}>
              <div className="w-full md:w-[200px] md:h-[200px] overflow-hidden rounded-lg border border-gray-400">
                <PopupImage
                  image={logo.image}
                  className=" w-full h-full object-cover hover:scale-110 transition-transform"
                  width={400}
                  height={400}
                />
              </div>

              <button
                onClick={() => downloadFileAtURL(logo.url)}
                className="mt-2 w-full flex justify-center items-center gap-3 px-3 py-2.5 bg-secondary text-white font-medium text-sm rounded-lg hover:bg-primary "
              >
                <LuDownload /> Download
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-nowrap font-primary text-3xl md:text-4xl text-dark mb-4">
          Stickers
        </h3>
        <div className="flex gap-4">Comming Soon...</div>
      </section>
    </main>
  );
};

export default DownloadPage;
