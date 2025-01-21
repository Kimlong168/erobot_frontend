"use client";
import { useState } from "react";
import { MdOutlineOpenWith } from "react-icons/md";
import { FaLink, FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import PopupImage from "@/components/ui/PopupImage";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import { useCartContext } from "@/contexts/CartContext";
import { enqueueSnackbar } from "notistack";
import ItemCartQuantity from "./ItemCartQuantity";
import OrderCheckoutForm from "@/components/form/OrderCheckoutForm";
import { buyNowMessage } from "@/data/messageToSend";
import { sendTelegramMessage } from "@/utils/sendTelegramMessage";
import { createOrder } from "@/queries/order";
import { useEffect } from "react";
const ProductDetailCard = ({ product }) => {
  const { id, image, name, description, categoryName, detail, price } = product;
  const { cartItems, addItemOrIncreaseQuantity } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [showDetail, setShowDetail] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    paymentMethod: "",
    md5: "",
    telegram: "",
    message: "",
  });

  //   get current url
  const currentURL = process.env.NEXT_PUBLIC_BASE_URL + "/products/" + id;

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        enqueueSnackbar("Link copied successfully!", {
          variant: "success", // Options: success, error, warning, info, default
          autoHideDuration: 1500, // Optional: Time in ms before the notification hides
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  const sendToTelegram = async () => {
    try {
      //   send to telegram
      const messageToSend = buyNowMessage(
        orderId,
        formData,
        parseFloat(price) * quantity,
        {
          productName: name,
          quantity: quantity,
          price: price,
        }
      );

      await sendTelegramMessage(
        messageToSend,
        process.env.NEXT_PUBLIC_TELEGRAM_ORDER_CHAT_ID
      );

      recordOrder();
    } catch (err) {
      console.error("Failed to send to telegram: ", err);
    }

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
      cartItems: [
        {
          ...product,
          quantity: quantity,
        },
      ],
      total: parseFloat(price) * quantity,
      status: formData.paymentMethod === "khqr" ? "paid" : "pending",
      date: new Date().toLocaleString("en-GB"),
      timeStamp: new Date().getTime(),
    };

    const result = await createOrder(order);

    console.log("Order recorded: ", result);

    // store orderId to order history and local storage
    // recordOrderHistory(orderId);
  };

  // generate order id
  useEffect(() => {
    const fullNameWithoutSpaces = formData.fullName.replace(/\s/g, "");
    setOrderId(
      `${fullNameWithoutSpaces}_${Math.floor(Date.now() / 1000).toString()}`
    );
  }, [formData.fullName]);

  return (
    <>
      {/* product detail card */}
      <ItemCartQuantity number={cartItems?.length} />
      <div className=" w-full mt-5">
        <div className="flex items-center justify-center w-full">
          <div className="border-2 border-gray-5 rounded-xl p-4 md:p-8 flex flex-col w-full md:flex-row gap-5 md:gap-24  text-gray-700 ">
            <div className="w-full md:w-2/5 ">
              <div
                onClick={() => setShowImage(true)}
                className="relative m-0 overflow-hidden rounded text-white"
              >
                {/* product image */}

                <PopupImage
                  className="h-full w-full rounded object-cover object-center cursor-zoom-in"
                  image={image}
                  width={500}
                  height={500}
                />
                {/* open button */}
                <div className="absolute top-0 rounded cursor-pointer bg-secondary grid place-content-center w-[30px] h-[30px]">
                  <MdOutlineOpenWith />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-center p-4">
                  Share this product
                </div>
                <SharingBtn url={currentURL} title={name} />
              </div>
            </div>

            <div className="md:px-6 mt-5 w-full">
              {/* product information */}
              <div>
                {/* product name */}
                <h6 className="block text-4xl">
                  <span className="font-bold">{name}</span>
                </h6>

                {/* category */}
                <h4 className="mb-5 text-gray-900 text-sm flex items-center gap-2">
                  <span>Category: </span>
                  <div className="text-primary">
                    {categoryName || "No Category"}
                  </div>
                </h4>

                {/* description and detail */}
                <div className="pb-8 mt-10">
                  <div className="flex gap-10 items-center w-full font-bold text-md">
                    <div
                      onClick={() => setShowDetail(false)}
                      className={` ${
                        !showDetail && "text-primary border-b-2 border-primary "
                      } cursor-pointer `}
                    >
                      Description:
                    </div>
                    <div
                      onClick={() => setShowDetail(true)}
                      className={` ${
                        showDetail && "text-primary border-b-2 border-primary "
                      } cursor-pointer `}
                    >
                      Detail:
                    </div>
                  </div>

                  <div className="mt-5 overflow-auto">
                    {showDetail ? (
                      <div>
                        {detail.trim() === "<p><br></p>" ||
                        detail.trim() === "" ? (
                          "No Detail"
                        ) : (
                          <article className="prose lg:prose-xl prose-img:w-full lg:prose-img:w-auto lg:prose-img:mx-auto lg:prose-img:block prose-a:text-blue-600 prose-a:hover:text-blue-400 dark:prose-blockquote:text-white/70 dark:prose-strong:text-white/90 dark:prose-h1:text-white/90 dark:prose-h2:text-white/90  dark:prose-h3:text-white/90  dark:prose-h4:text-white/90  min-w-full dark:text-white/80">
                            <ContentDisplay htmlString={detail} />
                          </article>
                        )}
                      </div>
                    ) : (
                      description
                    )}
                  </div>
                </div>
                <hr />

                <div className="flex items-center gap-12  mt-8">
                  {/* price */}
                  <div className="flex items-center gap-8">
                    Price
                    <h5 className="font-bold text-4xl">
                      $ {`${price}${!price.includes(".") ? ".00" : ""}`}
                    </h5>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 ">
                {/* quantity button */}

                <div className="flex flex-row  min-w-[135px] max-w-[135px] relative bg-transparent overflow-hidden ">
                  {/* minus button */}
                  <button
                    onClick={() => {
                      if (quantity < 2) return;

                      setQuantity(parseFloat(quantity) - 1);
                    }}
                    className="p-2.5 px-4 w-[41px] rounded-s bg-gray-400 hover:bg-gray-500 lg:active:animate-ping text-white font-bold "
                  >
                    <span className="m-auto  font-bold">-</span>
                  </button>

                  {/* input quantity */}
                  <input
                    type="number"
                    className="focus:outline-none text-center w-[53px] sm:pl-2.5 bg-gray-300 rounded-none font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    min={1}
                    value={parseFloat(quantity)}
                    onChange={(e) => {
                      if (e.target.value < 1) return;

                      setQuantity(e.target.value);
                    }}
                  ></input>

                  {/* plus button */}
                  <button
                    onClick={() => {
                      // find the product in the cart
                      setQuantity(parseFloat(quantity) + 1);
                    }}
                    className="p-2.5 px-4 w-[41px] rounded-e bg-gray-400 hover:bg-gray-500 lg:active:animate-ping text-white font-bold "
                  >
                    <span className="m-auto font-bold">+</span>
                  </button>
                </div>

                {/* buy now */}
                <button
                  onClick={() =>
                    // enqueueSnackbar(`This feature is under construction!`, {
                    //   variant: "error",
                    //   autoHideDuration: 1500,
                    // })

                    setIsOpenForm(true)
                  }
                  className="flex items-center justify-center max-w-[135px] w-[135px] gap-2 p-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Buy Now <FaMoneyBill />
                </button>
              </div>

              {/* buying and add to cart button */}

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => {
                    addItemOrIncreaseQuantity(product, parseInt(quantity));
                    enqueueSnackbar(
                      `Add ${quantity == 1 ? "" : quantity} ${name} to cart!`,
                      {
                        variant: "success",
                        autoHideDuration: 1500,
                      }
                    );
                  }}
                  title="add to cart"
                  className="flex items-center justify-center max-w-[135px] min-w-[135px] gap-2 p-2.5 px-1 bg-secondary hover:bg-primary-light text-white font-bold rounded relative"
                >
                  <span className="truncate">Add to Cart</span>
                  {quantity && (
                    <span className="absolute z-2 -right-2 -top-2 text-white  font-bold text-xs bg-yellow-500 rounded-full w-5 h-5 p-2 grid place-content-center animate-bounce">
                      +{parseInt(quantity)}
                    </span>
                  )}
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center justify-center w-[135px] max-w-[135px]  gap-2 p-2.5 font-bold rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Copy Link
                  <FaLink />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* order checkout form */}
      {isOpenForm && (
        <OrderCheckoutForm
          setIsOpenForm={setIsOpenForm}
          formData={formData}
          setFormData={setFormData}
          sendToTelegram={sendToTelegram}
          totalPrice={parseFloat(price) * quantity}
          orderDetail={{
            productName: name,
            quantity: quantity,
            price: price,
            total: parseFloat(price) * quantity,
          }}
        />
      )}
    </>
  );
};

export default ProductDetailCard;
