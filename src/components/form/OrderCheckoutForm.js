"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import RedStar from "@/components/ui/RedStar";
import SuccessModal from "@/components/ui/SuccessModal";
import WarningModal from "@/components/ui/WarningModal";
import LoadingWithPercentage from "@/components/ui/LoadingWithPercentage";
import { FaWindowClose } from "react-icons/fa";
import Link from "next/link";
import LinkIcon from "@/components/ui/LinkIcon";
import Image from "next/image";
import ConfirmModal from "../ui/ConfirmModal";
import contactInfo from "@/data/contactInfo";
// import lineLogo from "../../assets/images/line-logo.jpg";
// import facebookLogo from "../../assets/images/facebook-logo.jpg";
// import telegramLogo from "../../assets/images/telegram-logo.png";

const CustomerContactForm = ({
  setIsOpenForm,
  formData,
  setFormData,
  sendToTelegram,
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

  // handle change of input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // show confirm order modal
  const confirmOrder = () => {
    if (formData.fullName && formData.phoneNumber && formData.address) {
      setShowModal(true);
    } else {
      setIsShowWarning(true);
    }
  };

  const processOrder = async () => {
    setShowModal(false);
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
  };

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
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur z-[100] grid place-content-center text-black">
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
                  className="cursor-pointer hover:text-primary"
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

                    {/* email */}
                    <div className="mb-4">
                      <label
                        title="required"
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 border w-full border-gray-300 rounded-md"
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
                        <span className="font-bold rounded mr-2">Note:</span> We
                        will reach out to you via your contact or Telegram
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
                <div className="  rounded-md flex flex-col gap-5 items-center justify-center">
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
