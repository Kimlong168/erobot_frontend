import LinkIcon from "./LinkIcon";
import Link from "next/link";

import contactInfo from "@/data/contactInfo";
const ContactInfo = () => {
  return (
    <div>
      {" "}
      {/* contact info */}
      <div className="mt-10">
        <h2 className="text-nowrap text-3xl md:text-4xl font-primary text-dark dark:text-white/90">
          Our Contact
        </h2>

        {contactInfo && (
          <div className="pt-6 pb-3 porse lg:prose-xl">
            <div className=" hover:text-primary dark:hover:text-secondary hover:underline cursor-pointer w-fit">
              {/* phone */}
              <div>
                Phone:{" "}
                <Link href={`tel:${contactInfo.phoneNumber}`}>
                  {contactInfo.phoneNumber}
                </Link>
              </div>
            </div>
            <div className=" hover:text-primary dark:hover:text-secondary hover:underline cursor-pointer w-fit">
              {/* email */}
              <div>
                Email:{" "}
                <Link href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </Link>
              </div>
            </div>
            <div className=" hover:text-primary dark:hover:text-secondary hover:underline cursor-pointer w-fit">
              {/* telegram */}
              <div>
                {" "}
                Telegram:{" "}
                <Link href={contactInfo.telegram}>@erobotcambodia</Link>
              </div>
            </div>
          </div>
        )}

        {/* social media */}
        <div className="flex items-center gap-4 text-2xl mt-4">
          {contactInfo &&
            contactInfo.socialMedia?.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="hover:text-primary-light hover:underline text-dark  hover:text-black dark:text-white/90 dark:hover:text-white"
              >
                <LinkIcon title={item.title} size={32} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
