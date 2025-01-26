"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import RedStar from "@/components/ui/RedStar";
import SuccessModal from "@/components/ui/SuccessModal";
import WarningModal from "@/components/ui/WarningModal";
import LoadingWithPercentage from "@/components/ui/LoadingWithPercentage";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import LinkIcon from "@/components/ui/LinkIcon";
import ConfirmModal from "../ui/ConfirmModal";
import contactInfo from "@/data/contactInfo";
import Image from "next/image";
import assets from "@/assets/assets";
import QRCode from "qrcode";
import { BakongKHQR, khqrData, IndividualInfo, SourceInfo } from "bakong-khqr";
import downloadQrcode from "@/utils/downloadQrcode";
import { LuDownload } from "react-icons/lu";
import { FaX } from "react-icons/fa6";
// import lineLogo from "../../assets/images/line-logo.jpg";
// import facebookLogo from "../../assets/images/facebook-logo.jpg";
// import telegramLogo from "../../assets/images/telegram-logo.png";

const CustomerContactForm = ({
  setIsOpenForm,
  formData,
  setFormData,
  sendToTelegram,
  totalPrice,
  orderDetail = null,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState({
    showForm: true,
    showAlert: false,
  });
  const [inputLinkType, setInputLinkType] = useState("url");
  // const [scannerResult, setScannerResult] = useState(null);
  const [isShowWarning, setIsShowWarning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState(false); // Store transaction status

  // handle change of input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // show confirm order modal
  const confirmOrder = () => {
    if (
      formData.fullName &&
      formData.phoneNumber &&
      formData.address &&
      formData.paymentMethod
    ) {
      setShowModal(true);
    } else {
      setIsShowWarning(true);
    }
  };

  const processOrder = async () => {
    setShowModal(false);
    if (formData.paymentMethod === "khqr") {
      generateQrcode();
    } else {
      setIsSending(true);
      sendToTelegram();
      setTimeout(() => {
        setIsSubmitted({
          showForm: false,
          showAlert: true,
        });
      }, 3000);
      // reset the percentage value
      setProgress(0);
    }
  };

  const handleSelectPaymentMethod = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  const generateQrcode = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setStatus(false);

    const optionalData = {
      // currency: khqrData.currency.usd,
      currency: khqrData.currency.khr,
      amount: parseFloat(totalPrice),
      mobileNumber: "85512233455",
      storeLabel: "Coffee Shop",
      terminalLabel: "Cashier_1",
      purposeOfTransaction: "oversea",
      languagePreference: "km",
      merchantNameAlternateLanguage: formData.fullName,
      merchantCityAlternateLanguage: "ភ្នំពេញ",
      //   upiMerchantAccount: "0001034400010344ABCDEFGHJIKLMNO",
    };

    const individualInfo = new IndividualInfo(
      process.env.BAKONG_ACCOUNT_ID,
      "Kimlong Chann",
      "PHNOM PENH",
      optionalData
    );

    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    const qrcode = await QRCode.toDataURL(individual?.data.qr);
    setQrCode(qrcode);
    setFormData({ ...formData, md5: individual?.data.md5 });
  };

  // Check transaction status by MD5
  const checkTransactionStatusByMD5 = async () => {
    const token = process.env.BAKONG_API_TOKEN;
    const baseUrl = "https://api-bakong.nbc.gov.kh";
    try {
      // Define the endpoint URL
      const endpoint = `${baseUrl}/v1/check_transaction_by_md5`;

      // Configure headers
      const headers = {
        Authorization: `Bearer ${token}`, // Include the Bearer token
        "Content-Type": "application/json", // Ensure JSON content
      };

      console.log("formData.md5", formData.md5);

      // Define the request body
      const body = {
        md5: formData.md5,
      };

      // Make the POST request
      const response = await axios.post(endpoint, body, { headers });

      // Update status from the API response
      const status = response.data?.errorCode === null ? true : false;

      setStatus(status);
      console.log("response", response.data);
      console.log("status", status);

      if (status) {
        setIsSending(true);
        // record the transaction here
        sendToTelegram();
        setTimeout(() => {
          setIsSubmitted({
            showForm: false,
            showAlert: true,
          });
        }, 3000);
        // reset the percentage value
        setProgress(0);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (qrCode !== "" && !status) {
        checkTransactionStatusByMD5();
      }
    }, 5000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [qrCode, status]);

  // handle loading with percentage
  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress < 90 ? prevProgress + 8 : 100
        );
      }, 300);

      return () => clearInterval(interval);
    }, 1000);
  }, [isSending]);

  // qr code scanner
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
    });

    // render the scanner when the inputLinkType is qr-code
    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      // setScannerResult(result);
      setFormData({ ...formData, telegram: result });
      setInputLinkType("url");
    }

    function error() {
      return;
    }
  }, [inputLinkType]);

  return (
    <div>
      {isSubmitted.showForm && (
        <div>
          {/* form data */}
          <div
            className={`fixed inset-0 bg-slate-900/20 backdrop-blur z-[100] grid place-content-center text-black ${
              qrCode && "hidden"
            }`}
          >
            <div
              id="placeOrder"
              className="overflow-auto my-10 p-6 pt-0 w-fit bg-white rounded relative"
            >
              <div className=" md:w-[600px] lg:w-[700px]">
                {/* title */}
                <div className="sticky top-0 left-5 right-5 pb-3 pt-6 mb-4 border-b-4 border-gray-400  bg-white  flex justify-between items-center gap-4">
                  <h2 className="text-2xl font-bold">Place Order</h2>

                  <div
                    onClick={() => setIsOpenForm(false)}
                    className={`cursor-pointer hover:text-primary ${
                      isSending && "hidden"
                    }`}
                  >
                    <FaWindowClose size={18} />
                  </div>
                </div>

                {!isSending ? (
                  <>
                    {/* show order detail for buy now function */}
                    {orderDetail && (
                      <div className="-mt-1 mb-2.5 font-bold">
                        {orderDetail.productName} ( ${orderDetail.price}
                        {" x "}
                        {orderDetail.quantity}
                        {" = "}
                        <span className="text-lg text-primary">
                          Total ${orderDetail.total}
                        </span>
                        )
                      </div>
                    )}
                    {/*  form for user to input their information */}
                    <form>
                      {/* fullname */}
                      <div className="mb-4">
                        <label
                          title="required"
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Fullname
                          <RedStar />
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md  w-full"
                          required
                        />
                      </div>
                      {/* phone number */}
                      <div className="mb-4">
                        <label
                          title="required"
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                          <RedStar />
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className="mt-1 p-2 border w-full border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      {/* address */}
                      <div className="mb-4">
                        <label
                          title="required"
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Address
                          <RedStar />
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="mt-1 p-2 border w-full border-gray-300 rounded-md"
                          required
                        />
                      </div>

                      {/* contact link */}
                      <div className="mb-4">
                        <label
                          htmlFor="telegram"
                          className="text-sm font-medium text-gray-700 flex items-center justify-between gap-2 mb-1"
                        >
                          {/* social media icon color */}
                          <div className="flex flex-col sm:flex-row gap-2">
                            Your Contact link:
                            <span className="flex items-center gap-2">
                              {/* <Image
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded"
                              src={lineLogo}
                              alt=""
                            />

                            <Image
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded"
                              src={lineLogo}
                              alt=""
                            />
                            <Image
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded"
                              src={lineLogo}
                              alt=""
                            /> */}

                              {/* <span>or others</span> */}
                            </span>
                          </div>

                          {/* button option qrcode and url */}
                          <div className="flex gap-2 items-center">
                            <span
                              className={`cursor-pointer px-4 py-1  text-xs rounded  ${
                                inputLinkType == "url"
                                  ? "text-white bg-green-500"
                                  : "text-gray-900 border"
                              } `}
                              onClick={() => setInputLinkType("url")}
                            >
                              Url
                            </span>
                            <span
                              className={`cursor-pointer px-4 py-1  text-xs rounded  ${
                                inputLinkType == "qrcode"
                                  ? "text-white bg-green-500"
                                  : "text-gray-900 border"
                              } `}
                              onClick={() => setInputLinkType("qrcode")}
                            >
                              Qrcode
                            </span>
                          </div>
                        </label>

                        {inputLinkType === "url" ? (
                          <div>
                            {/* input url */}
                            <input
                              type="url"
                              id="telegram"
                              name="telegram"
                              placeholder="copy your url and paste here..."
                              value={formData.telegram}
                              onChange={handleChange}
                              className="mt-1 p-2 border w-full border-gray-300 rounded-md"
                            />

                            {/* to get rid of error unknown id="reader" */}
                            <div className="hidden" id="reader"></div>
                          </div>
                        ) : (
                          <div className="mt-2">
                            {/* qrcode scanner */}
                            <div className="rounded" id="reader"></div>
                            <p className="text-center text-gray-500">
                              Please scan the qr-code to get the link
                            </p>
                          </div>
                        )}
                      </div>
                      {/* payment method */}
                      <div className="mb-4">
                        <label
                          title="required"
                          htmlFor="paymentMethod"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Payment Method
                          <RedStar />
                        </label>
                        <div className="flex flex-col md:flex-row gap-2 mt-1">
                          <div
                            onClick={() => handleSelectPaymentMethod("cod")}
                            className={`w-full p-2 py-3 rounded border cursor-pointer grid place-content-center relative ${
                              formData.paymentMethod === "cod" &&
                              "border-bakong-red"
                            }`}
                          >
                            COD (Cash on delivery)
                            <span
                              className={`absolute top-0.5 right-0.5 ${
                                formData.paymentMethod !== "cod" && "hidden"
                              }`}
                            >
                              ✅
                            </span>
                          </div>
                          <div
                            onClick={() => handleSelectPaymentMethod("khqr")}
                            className={`w-full p-2 rounded border flex gap-3 items-center cursor-pointer relative ${
                              formData.paymentMethod === "khqr" &&
                              "border-bakong-red"
                            }`}
                          >
                            <Image
                              src={assets.KHQR}
                              alt="KHQR"
                              width={85}
                              height={60}
                            />
                            <div className="flex flex-col gap-0.5  w-full">
                              <div className="text-xs">Pay with KHQR</div>
                              <small className="text-[12px] text-gray-600">
                                Generate KHQR for payment
                              </small>
                            </div>
                            <span
                              className={`absolute top-0.5 right-0.5 ${
                                formData.paymentMethod !== "khqr" && "hidden"
                              }`}
                            >
                              ✅
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* message */}
                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remark
                        </label>
                        <textarea
                          name="message"
                          placeholder="List down all the sizes of each item you need here..."
                          value={formData.message}
                          onChange={handleChange}
                          rows="3"
                          className="mt-1 p-2 border w-full border-gray-300 rounded-md"
                        />
                      </div>

                      {/* order now button */}
                      <div
                        onClick={confirmOrder}
                        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark w-fit cursor-pointer font-bold"
                      >
                        Order Now
                      </div>

                      {/* note */}
                      <div className="my-4">
                        <hr />
                        <p className="mt-2">
                          <span className="font-bold rounded mr-2">Note:</span>{" "}
                          We will reach out to you via your contact or Telegram
                          promptly. Thank you for your patience.
                        </p>
                      </div>

                      {/* social media */}
                      <div className="flex items-center gap-5">
                        <div>For more information</div>
                        <div className="flex items-center gap-4 text-2xl">
                          {contactInfo &&
                            contactInfo.socialMedia.map((item, index) => (
                              <Link
                                href={item.url}
                                key={index}
                                className="hover:text-primary-light hover:underline"
                              >
                                <LinkIcon title={item.title} size={24} />
                              </Link>
                            ))}
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  // loading with percentage
                  <div className="bg-white rounded-md flex flex-col gap-5 items-center justify-center">
                    <p>
                      Please wait a moment, we are sending your order to our
                      system
                    </p>
                    <div className="flex items-center gap-3 bg-green-500 w-fit  py-2 px-4 rounded-sm">
                      <span className="font-bold text-white">Sending</span>
                      <LoadingWithPercentage percentage={progress} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* qr code for payment */}
          <div
            className={`fixed  inset-0 bg-slate-900/20 backdrop-blur z-[100] grid place-content-center text-black ${
              !qrCode && "hidden"
            }`}
          >
            {" "}
            {!status ? (
              <div>
                {qrCode && (
                  <div className="mt-6 font-bakong relative md:static">
                    <div
                      id={`erobot_khqr`}
                      style={{ backgroundColor: "white" }}
                      className="rounded-2xl shadow-lg px-14 py-10 grid place-content-center bg-white"
                    >
                      {/* <h2 className="text-xl text-center mb-3 font-bold text-bakong-red capitalize">
                        Pay to proceed your order
                      </h2> */}
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
                            {parseFloat(totalPrice)}{" "}
                            <small className="text-xs font-normal">USD</small>
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
                          currency: "USD",
                          amount: totalPrice,
                        });
                      }}
                    >
                      <LuDownload /> Download QR
                    </button>

                    <div
                      onClick={() => {
                        setIsOpenForm(false);
                        setQrCode("");
                      }}
                      className="absolute top-2 right-2 md:top-5 md:right-5 cursor-pointer z-[110]"
                    >
                      <FaX className=" w-[25px] h-[25px] md:w-[30px] md:h-[30px] rounded-full p-1.5 bg-bakong-red text-white transition-all hover:shadow-lg" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div
                  id="placeOrder"
                  className="overflow-auto my-10 p-6 pt-0 w-fit bg-white rounded relative"
                >
                  <div className=" md:w-[600px] lg:w-[700px]">
                    {/* title */}
                    <div className="sticky top-0 left-5 right-5 pb-3 pt-6 mb-4 border-b-4 border-gray-400  bg-white  flex justify-between items-center gap-4">
                      <h2 className="text-2xl font-bold">Place Order</h2>

                      <div
                        onClick={() => setIsOpenForm(false)}
                        className={`cursor-pointer hover:text-primary ${
                          isSending && "hidden"
                        }`}
                      >
                        <FaWindowClose size={18} />
                      </div>
                    </div>
                    <div className=" rounded-md flex flex-col gap-5 items-center justify-center">
                      <p>
                        Please wait a moment, we are sending your order to our
                        system
                      </p>
                      <div className="flex items-center gap-3 bg-green-500 w-fit  py-2 px-4 rounded-sm">
                        <span className="font-bold text-white">Sending</span>
                        <LoadingWithPercentage percentage={progress} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* confirm order   */}
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title="Confirm Order"
        message="Are you sure you want to order?"
        onConfirm={processOrder}
      />

      {/* fill required information alert */}
      <WarningModal
        isOpen={isShowWarning}
        setIsOpen={setIsShowWarning}
        title="Fill Required Information!"
        description="Please fill the required fields with * mark. Thank you!"
      />

      {/* submiting successfully alert */}
      <SuccessModal
        isOpen={isSubmitted.showAlert}
        setIsOpen={() => {
          setIsSubmitted({
            showForm: false,
            showAlert: false,
          });
          setIsOpenForm(false);
        }}
        title="You have ordered successfully!"
        description="We will contact to you as soon as possible. Thank you for your patience."
      />
    </div>
  );
};

export default CustomerContactForm;
