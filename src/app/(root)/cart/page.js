"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { enqueueSnackbar } from "notistack";
import Link from "next/link";
import { FaX } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import assets from "@/assets/assets";
import { createOrder } from "@/queries/order";
import OrderCheckoutForm from "@/components/form/OrderCheckoutForm";
import dataURItoBlob from "@/utils/dataURItoBlob";
import deleteImageFromStorage from "@/utils/deleteImageFromStorage";
import { useCartContext } from "@/contexts/CartContext";
import { storage, ref, uploadBytes, getDownloadURL } from "@/libs/firebase";
import { orderMessage } from "@/data/messageToSend";
import {
  sendTelegramImage,
  sendTelegramMessage,
} from "@/utils/sendTelegramMessage";
import OrderHistorySection from "./components/OrderHistorySection";
const CartPage = () => {
  const {
    cartItems,
    addItemOrIncreaseQuantity,
    removeItem,
    decreaseQuantity,
    clearCart,
    getTotalPrice,
  } = useCartContext();

  // show customer contact form
  const [isOpenForm, setIsOpenForm] = useState(false);
  // order id
  const [orderId, setOrderId] = useState("");
  // form data for customer contact
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    telegram: "",
    address: "",
    message: "",
    status: "",
    paymentMethod: "", //khqr, cod
    md5: "",
  });

  // generate order id
  useEffect(() => {
    const fullNameWithoutSpaces = formData.fullName.replace(/\s/g, "");
    setOrderId(
      `${fullNameWithoutSpaces}_${Math.floor(Date.now() / 1000).toString()}`
    );
  }, [formData.fullName]);

  // screenshot the cart image and send to telegram
  const sendToTelegram = () => {
    html2canvas(document.querySelector("#message")).then(function (canvas) {
      // Convert canvas to base64 data URL
      var imageData = canvas.toDataURL("image/png");

      // Convert base64 data URL to Blob
      var imageBlob = dataURItoBlob(imageData);

      const imageRef = ref(storage, `cart/cartImage_${orderId}`);
      uploadBytes(imageRef, imageBlob).then(() => {
        // Get the download URL for the uploaded image
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            const topicId = process.env.TELEGRAM_ORDER_CHAT_ID;

            try {
              // throw new Error("Fake error for testing");
              // caption for the image to send to telegram
              const messageToSend = orderMessage(
                orderId,
                formData,
                getTotalPrice()
              );

              const send = async () => {
                const response = await sendTelegramImage(
                  downloadURL,
                  messageToSend,
                  topicId
                );
                console.log("response sending image to telegram", response);
              };

              // excute send function and record order to database and get the post link
              send();

              // record order to database
              recordOrder();
            } catch (error) {
              console.error("Error sending image:", error);

              // send notifitaion to telegram if error
              const messageToSend = orderMessage(
                orderId,
                formData,
                getTotalPrice()
              );

              const send = async () => {
                const response = await sendTelegramMessage(
                  messageToSend,
                  topicId
                );
                console.log(
                  "response sending order message to telegram (send image error)",
                  response
                );
              };

              // excute send function
              send();
              recordOrder();
            }
            // Delete the cart image after 5s to save storage space
            setTimeout(() => {
              deleteImageFromStorage(imageRef);
            }, 5000); // 5s
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      });

      // download the cart image to user device
      var a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `Invoice_${orderId}.png`;
      a.click();
    });

    // reset the fullName to avoid dubplicate order id bcoz we user fullName to generate order id
    setFormData({
      ...formData,
      fullName: "",
    });
  };

  // record order to firestore database
  const recordOrder = async () => {
    // data to be recorded
    const order = {
      orderId: orderId,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      contactLink: formData.telegram,
      address: formData.address,
      message: formData.message,
      paymentMethod: formData.paymentMethod,
      md5: formData.md5,
      cartItems: cartItems,
      total: getTotalPrice(),
      status: formData.paymentMethod === "khqr" ? "paid" : "pending",
      date: new Date().toLocaleString("en-GB"),
      timeStamp: new Date().getTime(),
    };

    const result = await createOrder(order);
    clearCart();
    // store order ID in local storage as array list of order ID
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push(orderId);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <main className="container py-8 md:py-12">
      {/* shopping cart */}
      <div id="message">
        <div className={isOpenForm ? "p-4" : ""}>
          <section className="overflow-x-auto">
            <table className="w-full min-w-[300px]">
              <thead>
                <tr className="border-b border-gray-300 text-gray-600 ">
                  <th className="text-start pr-6 py-4">Item</th>
                  <th className="text-start pr-6 py-4">Name</th>
                  <th className="text-start pr-6 py-4">Price</th>
                  <th className="text-start pr-6 py-4">
                    <span>{isOpenForm ? "Qty" : "Quantity"}</span>
                  </th>
                  <th className="text-start pr-6 py-4">Total</th>
                  <th
                    className={`text-start pr-6 py-4 w-[100px] ${
                      isOpenForm || cartItems.length == 0 ? "hidden" : ""
                    }`}
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.length === 0 && (
                  <tr className="border-b border-gray-300">
                    <td colSpan="6" className="text-center py-4">
                      <p className="text-gray-600 mt-4">Your cart is empty.</p>
                      <Link
                        className="mt-2 text-sm text-blue-500 underline"
                        href="/products"
                      >
                        Shop Now!
                      </Link>
                    </td>
                  </tr>
                )}
                {cartItems?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className=" py-4">
                      <Image
                        width={50}
                        height={50}
                        src={item.image}
                        alt="product"
                      />
                    </td>
                    <td className="pr-3">{item.name}</td>
                    <td className="pr-3">$ {item.price}</td>
                    <td className="pr-3">
                      {" "}
                      <div className="flex items-center gap-1 md:gap-3">
                        <Image
                          width={50}
                          height={50}
                          onClick={() => decreaseQuantity(item.id)}
                          className={`w-7 h-7 cursor-pointer ${
                            isOpenForm ? "hidden" : ""
                          }`}
                          src={assets.removeIcon}
                          alt="remove_icon_red"
                        />
                        {item.quantity}
                        <Image
                          width={50}
                          height={50}
                          onClick={() => addItemOrIncreaseQuantity(item)}
                          className={`w-7 h-7 cursor-pointer ${
                            isOpenForm ? "hidden" : ""
                          }`}
                          src={assets.addIcon}
                          alt="add_icon_green"
                        />
                      </div>
                    </td>
                    <td className="pr-3">${item.price * item.quantity}</td>
                    <td
                      className={`cursor-pointer text-secondary ${
                        isOpenForm ? "hidden" : ""
                      }`}
                      onClick={() => {
                        removeItem(item.id);
                        enqueueSnackbar(`Remove ${item.name} from cart!`, {
                          variant: "error",
                          autoHideDuration: 1500,
                        });
                      }}
                    >
                      <FaX />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>{" "}
          <section className="mt-12">
            <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
              <div className="md:w-[45%]  order-2 md:order-1">
                <h3 className="text-2xl font-semibold">Cart Total</h3>
                <table className="w-full mt-3">
                  <tbody>
                    <tr className="border-b">
                      <td className="font-semibold pb-3 text-gray-600">
                        Subtotal
                      </td>
                      <td className="text-end">$ {getTotalPrice()}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="font-semibold pb-3 text-gray-600">
                        Other
                      </td>
                      <td className="text-end">$ 0</td>
                    </tr>
                    <tr>
                      <td className="font-bold pb-3">Total</td>
                      <td className="text-end font-bold">
                        $ {getTotalPrice()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className={isOpenForm ? "hidden" : ""}>
                    <tr>
                      <td>
                        {" "}
                        <button
                          onClick={() => {
                            if (cartItems.length == 0) {
                              enqueueSnackbar("Your cart is empty!", {
                                variant: "info",
                                autoHideDuration: 1500,
                              });
                              return;
                            }
                            setIsOpenForm(true);
                          }}
                          className="flex items-center gap-2 bg-white text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg"
                        >
                          <span>
                            <FaHeart fill="#E1232E" />
                          </span>{" "}
                          Checkout
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* order history */}
      <div>
        <OrderHistorySection />
      </div>

      {/* order checkout form */}
      {isOpenForm && (
        <OrderCheckoutForm
          setIsOpenForm={setIsOpenForm}
          formData={formData}
          setFormData={setFormData}
          sendToTelegram={sendToTelegram}
          totalPrice={getTotalPrice()}
        />
      )}
    </main>
  );
};

export default CartPage;
