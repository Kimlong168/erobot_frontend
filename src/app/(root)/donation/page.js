"use client";
import axios from "axios";
import { motion } from "framer-motion";
import DonorsList from "@/components/ui/DonorsList";
import QRCode from "qrcode";
import { BakongKHQR, khqrData, IndividualInfo, SourceInfo } from "bakong-khqr";
import { useEffect, useState } from "react";
import downloadQrcode from "@/utils/downloadQrcode";
import { LuDownload, LuLink } from "react-icons/lu";
import Image from "next/image";
import assets from "@/assets/assets";
import { PiHandsPrayingFill } from "react-icons/pi";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";
import { getCurrentTime, getCurrentTimeForDonor } from "@/utils/getCurrentTime";
import { useSearchParams } from "next/navigation";
import { fadeIn } from "@/utils/variants";
import { createDonor } from "@/queries/donor";
import { invitationMessage } from "@/data/messageToSend";

const DonationPage = () => {
  const searchParams = useSearchParams();
  // Extract values from the query parameters
  const name = searchParams.get("name");
  const amount = searchParams.get("amount");
  const curr = searchParams.get("curr");
  const [qrCode, setQrCode] = useState("");

  const [status, setStatus] = useState(false); // Store transaction status
  const [currency, setCurrency] = useState(curr || "USD");
  const [deepLink, setDeepLink] = useState("");
  const [paymentData, setPaymentData] = useState({
    name: name || "",
    amount: amount || "",
  });

  const generateQrcode = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setStatus(false);
    if (!paymentData.amount) {
      enqueueSnackbar("Pleaes input amount!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
      });
      return;
    }

    if (parseFloat(paymentData.amount) < 100 && currency == "KHR") {
      enqueueSnackbar("Amount in KHR cannot be less than 100 KHR", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
      });
      return;
    }

    // check if amount is string or number
    if (isNaN(parseFloat(paymentData.amount))) {
      enqueueSnackbar("Amount must be a number!", {
        variant: "error", // Options: success, error, warning, info, default
        autoHideDuration: 1500, // Optional: Time in ms before the notification hides
      });
      return;
    }

    const optionalData = {
      currency:
        currency === "USD" ? khqrData.currency.usd : khqrData.currency.khr,
      amount: parseFloat(paymentData.amount) || 1,
      mobileNumber: "85512233455",
      storeLabel: "Coffee Shop",
      terminalLabel: "Cashier_1",
      purposeOfTransaction: "oversea",
      languagePreference: "km",
      merchantNameAlternateLanguage: paymentData.name || "Kimlong Chann",
      merchantCityAlternateLanguage: "ភ្នំពេញ",
      //   upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO",
    };

    const individualInfo = new IndividualInfo(
      process.env.NEXT_PUBLIC_BAKONG_ACCOUNT_ID,
      "Kimlong Chann",
      "PHNOM PENH",
      optionalData
    );

    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    const qrcode = await QRCode.toDataURL(individual?.data.qr);
    setQrCode(qrcode);
    localStorage.setItem("md5", individual.data.md5); // Store in localStorage

    // deep link

    const url = "https://api-bakong.nbc.gov.kh/v1/generate_deeplink_by_qr"; // Replace with your API URL
    const khqrString = individual?.data.qr; // Replace with the QR data
    const sourceInfo = new SourceInfo(
      "https://kimlongchann.vercel.app/logo.png",
      "Kimlong Chann App",
      "https://kimlongchann.vercel.app/"
    );

    const deeplink = BakongKHQR.generateDeepLink(url, khqrString, sourceInfo);
    deeplink.then((data) => {
      if (data.status.code == 0) {
        console.log(data.data.shortLink);
        setDeepLink(data.data.shortLink);
      } else {
        console.log(data.status.message);
      }
    });
  };

  const checkTransactionStatusByMD5 = async () => {
    const token = process.env.NEXT_PUBLIC_BAKONG_API_TOKEN;

    const baseUrl = "https://api-bakong.nbc.gov.kh";
    try {
      // Define the endpoint URL
      const endpoint = `${baseUrl}/v1/check_transaction_by_md5`;

      // Configure headers
      const headers = {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Ensure JSON content
      };

      console.log("md5", String(localStorage.getItem("md5")));

      // Define the request body
      const body = {
        md5: String(localStorage.getItem("md5")),
      };

      // Make the POST request
      const response = await axios.post(endpoint, body, { headers });

      // Update status from the API response
      const status = response.data?.errorCode === null ? true : false;
      setStatus(status);

      if (status) {
        // Function to format the current date and time

        await sendTelegramMessage(
          `🎉 Donation received from ${paymentData.name || "anonymous"} for ${
            paymentData.amount
          } ${currency} on ${getCurrentTime()}`,
          process.env.NEXT_PUBLIC_TELEGRAM_DONATION_CHAT_ID
        );

        const amountInUSD =
          currency === "USD"
            ? parseFloat(paymentData.amount)
            : parseFloat(paymentData.amount) / 4000;

        createDonor({
          name: paymentData.name || "Anonymous",
          amount: amountInUSD,
          source: "website",
          date: getCurrentTimeForDonor(),
        });

        localStorage.removeItem("md5"); // Clear the MD5 from localStorage
      }
      // console.log("res", response.data);
    } catch (error) {
      // Handle errors
      console.error(
        "Error checking transaction status:",
        error.response?.data || error.message
      );
      throw error; // Re-throw to allow further error handling
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
    if (name == "amount") {
      setQrCode("");
      setDeepLink("");
      setStatus(false);
    }
  };

  const handleCurrencyChange = (currency) => {
    setCurrency(currency);
    setPaymentData((prev) => ({ ...prev, amount: "" }));
    setQrCode("");
    setDeepLink("");
    setStatus(false);
  };

  const handleCopyLink = (link) => {
    const linkWithoutSpace = link.replace(/\s/g, "%20");
    const text = invitationMessage(
      linkWithoutSpace,
      paymentData.amount,
      paymentData.name
    );

    navigator.clipboard
      .writeText(text)
      .then(() => {
        enqueueSnackbar("Invitation link copied successfully!", {
          variant: "success", // Options: success, error, warning, info, default
          autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  useEffect(() => {
    if (amount) {
      generateQrcode();
    }
  }, [amount]);

  // Check the transaction status every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (qrCode !== "" && !status) {
        checkTransactionStatusByMD5();
        // console.log("Checking transaction status...");
      }
    }, 5000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [qrCode, status]); // Empty dependency array ensures the interval starts on mount

  return (
    <main>
      <section>
        <div className="min-h-[calc(100vh-100px)]  grid justify-center items-center text-white bg-gray-500 bg-donate bg-cover bg-center p-6">
          <div
            className={`w-full max-w-sm md:max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-black/50 border -mt-4 ${
              qrCode && "mt-0"
            }`}
          >
            <div>
              {/* Currency Toggle */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => handleCurrencyChange("USD")}
                  className={`px-4 py-2 border border-white rounded-l-md ${
                    currency === "USD" && "bg-secondary font-bold"
                  }`}
                >
                  USD
                </button>
                <button
                  onClick={() => handleCurrencyChange("KHR")}
                  className={`px-4 py-2 border border-white rounded-r-md ${
                    currency === "KHR" && "bg-secondary font-bold"
                  }`}
                >
                  KHR
                </button>
              </div>

              {/* Title */}
              <h1 className="text-center text-3xl font-bold mb-6">
                Donate to ERobot Cambodia
              </h1>

              {/* Input Fields */}
              <form onSubmit={generateQrcode} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  onChange={handleOnChange}
                  value={paymentData.name}
                  placeholder="Your cute name"
                  className="w-full px-4 py-2 border text-black rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  onChange={handleOnChange}
                  name="amount"
                  value={paymentData.amount}
                  placeholder={
                    currency === "USD" ? "Amount in USD" : "Amount in KHR"
                  }
                  className="w-full px-4 py-2 border text-black rounded-md border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {currency === "USD" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        console.log("avoid submit form with the next button");
                      }}
                      className="hidden"
                    ></button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 1,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      1 $
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 5,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      5 $
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 10,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      10 $
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: Math.floor(Math.random() * 50) + 1,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 px-3 rounded-md w-full text-center"
                    >
                      Random
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {" "}
                    <button
                      onClick={() => {
                        console.log("avoid submit form with the next button");
                      }}
                      className="hidden"
                    ></button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 4000,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      4000 ៛
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 20000,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      20000 ៛
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          name: prev.name,
                          amount: 40000,
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      40000 ៛
                    </button>
                    <button
                      onClick={() =>
                        setPaymentData((prev) => ({
                          ...prev, // Spread previous state to keep other properties
                          amount: (Math.floor(Math.random() * 500) + 1) * 100, // Random number between 100 and 50000 ending in 00
                        }))
                      }
                      className="bg-bakong-red hover:bg-primary text-white py-2 rounded-md w-full text-center"
                    >
                      Random
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-secondary hover:bg-primary rounded-md"
                >
                  Generate QR Code ({currency === "USD" ? "$" : "៛"})
                </button>
              </form>
            </div>

            {!status ? (
              <div>
                {deepLink !== "" && (
                  <div className="text-center font-bakong mt-6 text-sx ">
                    <Link
                      className="text-blue-500 hover:underline"
                      href={deepLink}
                    >
                      🔗 Click here to pay in Bakong mobile app
                    </Link>
                    <p>
                      or simply scan the{" "}
                      <span className="font-bakong text-bakong-red font-bold">
                        KHQR
                      </span>{" "}
                      down below with any banking apps in cambodia (member of
                      Bakong)
                    </p>
                  </div>
                )}
                {qrCode && (
                  <div className="mt-6 font-bakong">
                    <div
                      id={`erobot_khqr`}
                      style={{ backgroundColor: "white" }}
                      className="rounded-2xl shadow-lg px-14 py-10 grid place-content-center bg-white"
                    >
                      <div className="rounded-2xl shadow-lg w-[265px] border border-gray-200/50">
                        {/* Header */}
                        <div className="bg-bakong-red  py-4 rounded-t-2xl grid place-content-center">
                          <Image
                            src={assets.khqrLogo}
                            alt="QR Code"
                            className="w-[60px]"
                            width={100}
                            height={100}
                          />
                        </div>

                        {/* Card Content */}
                        <div className="bg-white">
                          <p className="text-lg font-semibold my-2 text-gray-800 px-8">
                            Erobot Cambodia
                          </p>
                          <p className="text-2xl font-bold text-gray-800 font-bakong flex justify-start items-center gap-4 px-8 -my-1.5 break-all">
                            {parseFloat(paymentData.amount)}{" "}
                            <small className="text-xs font-normal">
                              {currency}
                            </small>
                          </p>

                          <div className="text-gray-400 text-center ">
                            --------------------------------------
                          </div>
                          {/* QR Code */}
                          <div className="mb-3 w-full flex justify-center ">
                            <Image
                              src={qrCode}
                              alt="QR Code"
                              className="min-w-[220px] "
                              width={192}
                              height={192}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-center text-gray-500 w-[265px] mt-5">
                        Scan with any Mobile Banking App supporting KHQR
                      </div>
                    </div>

                    <button
                      className="mt-2 w-full flex justify-center items-center gap-3 px-4 py-3 bg-bakong-red  text-white font-medium text-sm rounded-xl hover:bg-blue-600 "
                      onClick={() => {
                        downloadQrcode({
                          currency: currency,
                          amount: paymentData.amount,
                        });
                      }}
                    >
                      <LuDownload /> Download QR
                    </button>

                    <button
                      className="mt-2 w-full flex justify-center items-center gap-3 px-4 py-3 bg-blue-500 text-white font-medium text-sm rounded-xl hover:bg-blue-600"
                      onClick={
                        () =>
                          handleCopyLink(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/donation?name=${paymentData.name}&amount=${paymentData.amount}&curr=${currency}`
                          )
                        // handleCopyLink(
                        //   `http://localhost:3000/donation?name=${paymentData.name}&amount=${paymentData.amount}&curr=${currency}`
                        // )
                      }
                    >
                      <LuLink /> Copy link to invite friends
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-100 p-6 rounded-lg text-center shadow-md mt-5">
                <div className="text-center mb-3 p-4=2 bg-white rounded-full border w-[100px] h-[100px] grid place-content-center mx-auto shadow-md">
                  <span className="text-[70px] text-green-700">
                    <PiHandsPrayingFill />
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-green-700">
                  Thank you, {paymentData.name || "Sir/Madam"}!
                </h2>
                <p className="text-lg text-gray-700 mt-2">
                  We greatly appreciate your generous donation of{" "}
                  <span className="font-bold text-green-700">
                    {parseFloat(paymentData.amount)} {currency}
                  </span>
                  . <br /> Your generosity enables us to continue our work and
                  make a lasting impact. May it be returned to you a thousand
                  times, and may you always be blessed with health, happiness,
                  and success.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-t-2 border-black/80 ">
        <h2 className="text-2xl font-primary bg-secondary hover:bg-primary text-center py-1 text-white">
          Our Donors
        </h2>
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.1 }}
        >
          <DonorsList direction="left" />
        </motion.div>
      </section>

      {/* <section className="relative bg-boy bg-cover bg-center h-[500px]">
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
              <DrawCircleText />
            </h3>
          </motion.div>
        </div>
      </section> */}
    </main>
  );
};

export default DonationPage;
