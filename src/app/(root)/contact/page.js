"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import LinkIcon from "@/components/ui/LinkIcon";
import SuccessModal from "@/components/ui/SuccessModal";
import RedStar from "@/components/ui/RedStar";
import WarningModal from "@/components/ui/WarningModal";
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";
import { getCurrentTime } from "@/utils/getCurrentTime";

const ContactPage = () => {
  // get user email to cc to the user when they submit the contact form
  // const contactInfo = contactList.map((item) => item)[0];
  const language = "en";
  const contactInfo = {
    phoneNumber: "010 567 014",
    email: "erobotteam@gmail.com",
    telegram: "",
    socialMedia: [
      {
        title: "Facebook",
        url: "https://www.facebook.com/sorakhmer",
      },
      {
        title: "Tiktok",
        url: "https://t.me/sorakhmer",
      },
      {
        title: "Youtube",
        url: "https://t.me/sorakhmer",
      },
      {
        title: "Telegram",
        url: "https://t.me/sorakhmer",
      },
    ],
    telegramBotId: "",
    chatId: "",
  };

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
    description: "",
    email: "",
    socialMediaLink: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isShowWarning, setIsShowWarning] = useState(false);

  // handle send message to telegram
  //bot token
  // var telegram_bot_id = contactInfo ? contactInfo.telegramBotId : "";
  //chat id
  // var chat_id = "@sorakhmerCustomerOrder"; //can only send to the public channel
  // var chat_id = contactInfo ? contactInfo.chatId : ""; //channel id : we can send to both private and public channel

  const sendToTelegram = (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.description) {
      setIsShowWarning(true);
      return;
    }

    // Send customer contact and information to telegram
    try {
      const send = async () => {
        const messageToSend = `===== New Message =====\n\nDate: ${getCurrentTime()}
          ${formData.fullname ? `\nName: ${formData.fullname}` : ""}
          ${
            formData.socialMediaLink
              ? `\nSocial Media: ${formData.socialMediaLink}`
              : ""
          }
          ${formData.phone ? `\nPhone Number: ${formData.phone}` : ""}
          ${formData.address ? `\nAddress: ${formData.address}` : ""}
          ${formData.email ? `\nEmail: ${formData.email}` : ""}
          ${formData.description ? `\nMessage: ${formData.description}` : ""}
       `;

        await sendTelegramMessage(
          messageToSend,
          process.env.NEXT_PUBLIC_TELEGRAM_MESSAGE_CHAT_ID
        );
        // clear form data
        setFormData({
          fullname: "",
          phone: "",
          address: "",
          description: "",
          email: "",
          socialMediaLink: "",
        });

        // set submitted to true to show success modal
        setIsSubmitted(true);
      };

      // excute function to send message to telegram
      send();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // handle input change
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="container p-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-12 md:gap-18 lg:gap-24">
        {/* contact information */}
        <div className="w-full">
          {/* map */}
          <div>
            <h3 className="text-nowrap font-bold text-3xl md:text-4xl ">
              {language == "en" ? "Our Organization" : "ក្រុមហ៊ុនខ្មែរយ៉ូរីយូ"}
            </h3>
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* company address */}
              <div className="pt-8 mb-4 lg:prose-xl ">
                Street 11C, House 012BT, Phum Roung Chakr, Phnom Penh, Cambodia
              </div>

              <div>
                {/* google map */}

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62539.741909973796!2d104.78802680969235!3d11.570926220624598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951ea35dc66fd%3A0x523fbc694fa0fab4!2z4Z6X4Z684Z6Y4Z634Z6a4Z-E4Z6E4Z6F4Z6A4Z-S4Z6aLCDhnpfhn5LhnpPhn4bhnpbhn4Hhnok!5e0!3m2!1skm!2skh!4v1736693799606!5m2!1skm!2skh"
                  className="w-full xl:w-[80%]"
                  height="310"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
          {/* contact info */}
          <div className="mt-10">
            <h3 className="text-nowrap font-bold text-3xl md:text-4xl ">
              {language == "en" ? "Our Contact" : "ទំនាក់ទំនងតាមរយៈ"}
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
                    {language == "en" ? "Phone" : "លេខទូរស័ព្ទ"}:{" "}
                    <Link href={`tel:${contactInfo.phoneNumber}`}>
                      {contactInfo.phoneNumber}
                    </Link>
                  </div>
                </div>
                <div className=" hover:text-primary hover:underline cursor-pointer w-fit">
                  {/* email */}
                  <div>
                    {language == "en" ? "Email" : "អ៊ីម៉ែល"}:{" "}
                    <Link href={`mailto:${contactInfo.email}`}>
                      {contactInfo.email}
                    </Link>
                  </div>
                </div>
                <div className=" hover:text-primary hover:underline cursor-pointer w-fit">
                  {/* telegram */}
                  <div>
                    {" "}
                    {language == "en" ? "Telegram" : "តេលេក្រាម"}:{" "}
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

        {/* contact form */}
        <div className="w-full">
          <h3 className="text-nowrap font-bold text-3xl md:text-4xl">
            {language == "en" ? "Send a message" : "ផ្ញើសារមកកាន់យើង"}
          </h3>

          {/* form submit message */}
          <motion.form
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            onSubmit={(e) => sendToTelegram(e)}
          >
            <div className="flex flex-col gap-3 mt-5 md:mt-8">
              <div className="flex flex-col gap-0.5">
                {/* input fullname */}
                <label className="lg:prose-xl ">
                  {language == "en" ? "Fullname" : "ឈ្មោះ"}
                  <RedStar />
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input social media  */}
                <label className="lg:prose-xl ">
                  {" "}
                  {language == "en" ? "Social media" : "បណ្តាញសង្គម"}(Telegram,
                  Line, Facebook,...)
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="url"
                  value={formData.socialMediaLink}
                  name="socialMediaLink"
                  onChange={(e) => handleOnChange(e)}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input email */}
                <label className="lg:prose-xl ">
                  {language == "en" ? "Email" : "អ៊ីម៉ែល"}
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input phone */}
                <label className="lg:prose-xl ">
                  {language == "en" ? "Phone" : "លេខទូរស័ព្ទ"}
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input country */}
                <label className="lg:prose-xl ">
                  {" "}
                  {language == "en" ? "Address" : "អាសយដ្ឋាន"}
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                {/* input message */}
                <label className="lg:prose-xl ">
                  {language == "en" ? "Message" : "ការពិពណ៌នា"}
                  <RedStar />
                </label>
                <textarea
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  name="description"
                  cols="30"
                  rows="5"
                  value={formData.description}
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>

              {/* submit button */}
              {contactInfo && (
                <button
                  type="submit"
                  className="lg:prose-xl border-2 rounded-lg bg-secondary hover:bg-primary border-white px-6 py-2 font-semibold text-white"
                >
                  Send Message
                </button>
              )}
            </div>
          </motion.form>

          {/* fill required information alert */}
          <WarningModal
            isOpen={isShowWarning}
            setIsOpen={setIsShowWarning}
            title={
              language == "en"
                ? "Fill Required Information!"
                : "បំពេញព័ត៌មានដែលចាំបាច់!"
            }
            description={
              language == "en"
                ? "Please fill the required fields with * mark. Thank you!"
                : "សូមបំពេញព័ត៌មានដែលចាំបាច់ដែលមាន * ជាសម្គាល់។ អរគុណ!"
            }
          />

          {/* submiting successfully alert */}

          <SuccessModal
            isOpen={isSubmitted}
            setIsOpen={() => {
              setIsSubmitted(false);
            }}
            title={language == "en" ? "Message Sent!" : "ផ្ញើសារដោយជោគជ័យ!"}
            description={
              language == "en"
                ? "Thank you for reaching out to us. We will get back to you as soon as possible."
                : "សូមអរគុណសំរាប់ការទំនាក់ទំនងមកកាន់យើង។ យើងនឹងឆ្លើយតបទៅអ្នកវិញនៅពេលក្រោយ។"
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
