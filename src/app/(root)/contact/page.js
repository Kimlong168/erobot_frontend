"use client";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import SuccessModal from "@/components/ui/SuccessModal";
import RedStar from "@/components/ui/RedStar";
import WarningModal from "@/components/ui/WarningModal";
// import { sendTelegramMessage } from "@/utils/sendTelegramMessage";
import { getCurrentTime } from "@/utils/getCurrentTime";
import ContactInfo from "@/components/ui/ContactInfo";

const ContactPage = () => {
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

  // handle input change
  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendToTelegram = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.description) {
      setIsShowWarning(true);
      return;
    }

    try {
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

      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_GENERAL_CHAT_ID;
      const topicId = process.env.NEXT_PUBLIC_TELEGRAM_MESSAGE_CHAT_ID;
      const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

      await axios.post(url, {
        chat_id: chatId,
        text: messageToSend,
        message_thread_id: topicId,
        parse_mode: "Markdown",
      });

      // Wait for the message to be sent to Telegram
      // await sendTelegramMessage(
      //   messageToSend,
      //   process.env.NEXT_PUBLIC_TELEGRAM_MESSAGE_CHAT_ID
      // );

      // Clear form data
      setFormData({
        fullname: "",
        phone: "",
        address: "",
        description: "",
        email: "",
        socialMediaLink: "",
      });

      // Show success modal
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <section className="container p-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-12 md:gap-18 lg:gap-24">
        {/* contact information */}
        <div className="w-full">
          {/* map */}
          <div>
            <h3 className="text-nowrap font-bold text-3xl md:text-4xl ">
              Our Organization
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

          {/* contact information */}
          <ContactInfo />
        </div>

        {/* contact form */}
        <div className="w-full">
          <h3 className="text-nowrap font-bold text-3xl md:text-4xl">
            Send a message
          </h3>

          {/* form submit message */}
          <form
            // variants={fadeIn("left", 0.2)}
            // initial="hidden"
            // whileInView={"show"}
            // viewport={{ once: true, amount: 0.3 }}
            onSubmit={(e) => sendToTelegram(e)}
          >
            <div className="flex flex-col gap-3 mt-5 md:mt-8">
              <div className="flex flex-col gap-0.5">
                {/* input fullname */}
                <label className="lg:prose-xl ">
                  Fullname
                  <RedStar />
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input social media  */}
                <label className="lg:prose-xl ">
                  {" "}
                  Social media(Telegram, Line, Facebook,...)
                </label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="url"
                  value={formData.socialMediaLink}
                  name="socialMediaLink"
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input email */}
                <label className="lg:prose-xl ">Email</label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input phone */}
                <label className="lg:prose-xl ">Phone</label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                />
              </div>

              <div className="flex flex-col gap-0.5">
                {/* input country */}
                <label className="lg:prose-xl "> Address</label>
                <input
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                {/* input message */}
                <label className="lg:prose-xl ">
                  Message
                  <RedStar />
                </label>
                <textarea
                  className="border border-border focus:border-primary outline-none p-2.5 rounded bg-transparent"
                  name="description"
                  cols="30"
                  rows="5"
                  value={formData.description}
                  onChange={handleOnChange}
                ></textarea>
              </div>

              <button
                // onClick={sendToTelegram}
                type="submit"
                className="lg:prose-xl border-2 rounded-lg bg-secondary hover:bg-primary border-white px-6 py-2 font-semibold text-white"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* fill required information alert */}
          <WarningModal
            isOpen={isShowWarning}
            setIsOpen={setIsShowWarning}
            title="Fill Required Information!"
            description="Please fill the required fields with * mark. Thank you!"
          />

          {/* submiting successfully alert */}

          <SuccessModal
            isOpen={isSubmitted}
            setIsOpen={() => {
              setIsSubmitted(false);
            }}
            title="Message Sent!"
            description="Thank you for reaching out to us. We will get back to you as soon as possible."
          />
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
