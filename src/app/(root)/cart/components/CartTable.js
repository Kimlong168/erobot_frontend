"use client";
import assets from "@/assets/assets";
import { useCartContext } from "@/contexts/CartContext";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { createOrder } from "@/queries/order";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import OrderCheckoutForm from "@/components/form/OrderCheckoutForm";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { useEffect, useState } from "react";
import { storage, ref, uploadBytes, getDownloadURL } from "@/libs/firebase";
import axios from "axios";
import checkSocialMedia from "@/utils/checkSocialMedia";
import { deleteImageFromStorage } from "@/utils/deleteImageFromStorage";
import html2canvas from "html2canvas";

const CartTable = () => {
  const {
    cartItems,
    addItemOrIncreaseQuantity,
    removeItem,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartContext();
  const [showModal, setShowModal] = useState(false);

  // const validateOrder = () => {
  //   if (cartItems?.length === 0) {
  //     enqueueSnackbar("Your cart is empty!", {
  //       variant: "error",
  //       autoHideDuration: 1500,
  //     });
  //     return;
  //   }

  //   setShowModal(true);
  // };

  // const processOrder = async () => {
  //   setShowModal(false);

  //   const data = {
  //     address: "Phnom Penh",
  //     contactLink: "test",
  //     date: "02/04/2024, 16:05:24",
  //     fullName: "Chann Kimlong",
  //     message: "test",
  //     orderId: "ChannKimlong_1712048721",
  //     paymentMethod: "default",
  //     phoneNumber: "086961256",
  //     status: "paid",
  //     timeStamp: 1712048724623,
  //     total: 70,
  //     cartItems: cartItems,
  //   };

  //   const result = await createOrder(data);

  //   console.log("result:", result);

  //   if (result) {
  //     enqueueSnackbar("Order success!", {
  //       variant: "success",
  //       autoHideDuration: 1500,
  //     });
  //     localStorage.removeItem("cartItems");
  //     clearCart();
  //   } else {
  //     console.log("Order fail!:", result);

  //     enqueueSnackbar("Order fail!", {
  //       variant: "error",
  //       autoHideDuration: 1500,
  //     });
  //   }
  // };

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
    email: "",
    message: "",
  });

  // generate order id
  useEffect(() => {
    const fullNameWithoutSpaces = formData.fullName.replace(/\s/g, "");
    setOrderId(
      `${fullNameWithoutSpaces}_${Math.floor(Date.now() / 1000).toString()}`
    );
  }, [formData.fullName]);

  // handle send message to telegram

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
            //get the download url
            // https://admin.sorakhmer.com/order/${orderId}
            try {
              const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
              const chatId = process.env.NEXT_PUBLIC_TELEGRAM_GENERAL_CHAT_ID;
              const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
              const form = new FormData();

              // caption for the image to send to telegram
              const messageToSend = `===== New Order =====\n\nOrder id: ${orderId}\n\nDate: ${new Date().toLocaleString()}\n\nUpdate Status: ${baseUrl}/orderDetail/${orderId}
                 \n----------------------------------${
                   formData.fullName ? `\nName: ${formData.fullName}` : ""
                 }
                 ${
                   formData.phoneNumber
                     ? `\nPhone: ${formData.phoneNumber}`
                     : ""
                 }
                 ${formData.address ? `\nAddress: ${formData.address}` : ""}
                 ${formData.email ? `\nEmail: ${formData.email}` : ""}
                 ${
                   formData.telegram
                     ? `\n${checkSocialMedia(formData.telegram)}: ${
                         formData.telegram
                       }`
                     : ""
                 }
                 ${formData.message ? `\nMessage: ${formData.message}` : ""}
                 \n----------------------------------
                 \n💰Total: ${getTotalPrice()} $
                 \n----------------------------------`;

              form.append("chat_id", chatId);
              // url of image to send
              form.append("photo", downloadURL);
              // caption for the image
              form.append("caption", messageToSend);

              const send = async () => {
                const response = await axios.post(
                  `https://api.telegram.org/bot${botToken}/sendPhoto`,
                  form,
                  {
                    headers: {
                      "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
                    },
                  }
                );
                console.log("Image sent successfully!", response);
              };

              // excute send function and record order to database and get the post link
              send();

              // record order to database
              recordOrder();
            } catch (error) {
              console.error("Error sending image:", error);
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
    // get the price and name of the product from the productList instead of local storage
    // const updatedCartItems = cartItems.map((item) => {
    //   const product = productList.filter(
    //     (product) => product.id === item.id
    //   )[0];
    //   return {
    //     id: item.id,
    //     name: product.name,
    //     price: product.price,
    //     quantity: item.quantity,
    //     image: product.image,
    //   };
    // });

    // set cartItem to null and clear local storage
    // setCartItems([]);

    // data to be recorded
    const order = {
      orderId: orderId,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      contactLink: formData.telegram,
      address: formData.address,
      email: formData.email,
      message: formData.message,
      cartItems: cartItems,
      total: getTotalPrice(),
      status: "pending",
      paymentMethod: "default",
      date: new Date().toLocaleString("en-GB"),
      timeStamp: new Date().getTime(),
    };

    const result = await createOrder(order);
    clearCart();
    // store orderId to order history  and local storage
    // recordOrderHistory(orderId);
  };

  return (
    <>
      {" "}
      <section className="overflow-x-auto">
        <table id="message" className="w-full min-w-[300px]">
          <thead>
            <tr className="border-b border-gray-300 text-gray-600 ">
              <th className="text-start pr-6 py-4">Items</th>
              <th className="text-start pr-6 py-4">Title</th>
              <th className="text-start pr-6 py-4">Price</th>
              <th className="text-start pr-6 py-4">Quantity</th>
              <th className="text-start pr-6 py-4">Total</th>
              <th className="text-start pr-6 py-4 w-[100px]">Remove</th>
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
                      className="w-7 h-7"
                      src={assets.removeIcon}
                      alt="remove_icon_red"
                    />
                    {item.quantity}
                    <Image
                      width={50}
                      height={50}
                      onClick={() => addItemOrIncreaseQuantity(item)}
                      className="w-7 h-7"
                      src={assets.addIcon}
                      alt="add_icon_green"
                    />
                  </div>
                </td>
                <td className="pr-3">${item.price * item.quantity}</td>
                <td
                  className="cursor-pointer text-secondary"
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
        <SnackbarProvider />
      </section>{" "}
      <section className="mt-12">
        <div className="flex flex-col md:flex-row justify-between gap-10 w-full">
          <div className="md:w-[45%]  order-2 md:order-1">
            <h3 className="text-2xl font-semibold">Cart Total</h3>
            <table className="w-full mt-3">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold pb-3 text-gray-600">Subtotal</td>
                  <td className="text-end">$ {getTotalPrice()}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold pb-3 text-gray-600">Other</td>
                  <td className="text-end">$ 0</td>
                </tr>
                <tr>
                  <td className="font-bold pb-3">Total</td>
                  <td className="text-end font-bold">$ {getTotalPrice()}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    {" "}
                    <button
                      onClick={() => setIsOpenForm(true)}
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

        {/* <ConfirmModal
          show={showModal}
          setShow={setShowModal}
          title="Conform Order"
          message="Are you sure you want to order?"
          onConfirm={recordOrder}
        /> */}
      </section>
      {/* order checkout form */}
      {isOpenForm && (
        <OrderCheckoutForm
          setIsOpenForm={setIsOpenForm}
          formData={formData}
          setFormData={setFormData}
          sendToTelegram={sendToTelegram}
        />
      )}
    </>
  );
};

export default CartTable;
