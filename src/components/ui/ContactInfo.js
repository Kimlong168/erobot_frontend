import LinkIcon from "./LinkIcon";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { getContactInfo } from "@/queries/coontact";
const ContactInfo = async () => {
  const contactInfo = await getContactInfo();
  return (
    <div>
      {" "}
      {/* contact info */}
      <div className="mt-10">
        <h3 className="text-nowrap font-bold text-3xl md:text-4xl ">
          Our Contact
        </h3>

        {contactInfo && (
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            className="pt-6 pb-3 porse lg:prose-xl"
          >
            <div className=" hover:text-primary hover:underline cursor-pointer w-fit">
              {/* phone */}
              <div>
                Phone
                <Link href={`tel:${contactInfo.phoneNumber}`}>
                  {contactInfo.phoneNumber}
                </Link>
              </div>
            </div>
            <div className=" hover:text-primary hover:underline cursor-pointer w-fit">
              {/* email */}
              <div>
                Email
                <Link href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </Link>
              </div>
            </div>
            <div className=" hover:text-primary hover:underline cursor-pointer w-fit">
              {/* telegram */}
              <div>
                {" "}
                Telegram
                <Link href={contactInfo.telegram}>@erobotcambodia</Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* social media */}
        <div className="flex items-center gap-4 text-2xl mt-4">
          {contactInfo &&
            contactInfo.socialMedia?.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                className="hover:text-primary-light hover:underline"
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
