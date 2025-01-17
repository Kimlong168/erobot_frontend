"use client";
import { MdOutlineOpenWith } from "react-icons/md";
import PopupImage from "@/components/ui/PopupImage";
import { useContext, useState } from "react";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import { FaLink, FaMoneyBill, FaShoppingCart } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import Notification from "@/components/ui/Notification";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Image from "next/image";

const ProductDetailCard = ({ product }) => {
  const { id, image, name, description, categoryName, detail, price } = product;

  const [showDetail, setShowDetail] = useState(false);
  const [quantity, setQuantity] = useState(1);

  //   get current url
  const currentURL = process.env.Next_PUBLIC_BASE_URL + "/products/" + id;

  return (
    <>
      {/* product detail card */}
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
                  // onClick={() => setIsOpenForm(true)}
                  className="flex items-center justify-center max-w-[135px] w-[135px] gap-2 p-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Buy Now <FaMoneyBill />
                </button>
              </div>

              {/* buying and add to cart button */}

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => {
                    // addToCart({ id, name, price, image, quantity });
                    // // show number added to cart
                    // setShowNumberToAdd(true);
                    // setTimeout(() => {
                    //   setShowNumberToAdd(false);
                    // }, 500);
                    // // show add to cart notification
                    // setIsAddedtoCart(true);
                    // // show view cart button
                    // setShowViewCartBtn(true);
                    // // hide view cart button after 2s
                    // setTimeout(() => {
                    //   setShowViewCartBtn(false);
                    // }, 2000);
                  }}
                  title="add to cart"
                  className="flex items-center justify-center max-w-[135px] min-w-[135px] gap-2 p-2.5 px-1 bg-secondary hover:bg-primary-light text-white font-bold rounded relative"
                >
                  <span className="truncate">Add to Cart</span>
                  {/* {showNumberToAdd && (
                    <span className="absolute z-2 -right-2 -top-2 text-white  font-bold text-xs bg-red-600 rounded-full w-5 h-5 p-2 grid place-content-center animate-bounce">
                      +{quantity}
                    </span>
                  )} */}

                  {/* {isAddedtoCart ? (
                    <IoMdCheckmarkCircleOutline className="animate-ping" />
                  ) : (
                    <FaShoppingCart />
                  )} */}
                </button>

                <button className="flex items-center justify-center w-[135px] max-w-[135px]  gap-2 p-2.5 font-bold rounded bg-blue-600 hover:bg-blue-700 text-white">
                  Copy Link
                  {/* {copied ? (
                    <IoMdCheckmarkCircleOutline className="animate-ping" />
                  ) : (
                    <FaLink />
                  )} */}
                </button>
              </div>
            </div>
          </div>

          {/* copy link notification */}

          {/* {copied && (
            <div className="flex flex-col gap-1 w-72 fixed top-1 right-2 z-50 pointer-events-none">
              <AnimatePresence>
                <Notification
                  text="Product link is copied!"
                  removeNotif={() => setCopied(false)}
                  id={currentURL}
                  bg="bg-blue-500"
                />
              </AnimatePresence>
            </div>
          )} */}

          {/* add to cart notification */}

          {/* {isAddedtoCart && (
            <div className="flex flex-col gap-1 w-72 fixed top-1 right-2 z-50 pointer-events-none">
              <AnimatePresence>
                <Notification
                  text={`${name}is added to cart!`}
                  removeNotif={() => setIsAddedtoCart(false)}
                  id={id}
                  bg="bg-primary"
                />
              </AnimatePresence>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ProductDetailCard;
