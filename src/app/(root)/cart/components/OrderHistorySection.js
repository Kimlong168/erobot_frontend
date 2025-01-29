"use client";
import { useEffect, useState } from "react";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import OrderDetailCard from "./OrderDetailCard";
import StatusColor from "@/components/ui/StatusColor";
import { getOrders } from "@/queries/order";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
const OrderHistorySection = () => {
  const [orderList, setOrderList] = useState([]);
  const [orderHistoryIdList, setOrderHistoryIdList] = useState([]);
  const [orderHistoryList, setOrderHistoryList] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState({
    status: false,
    id: null,
  });
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrderList(orders);

      const orderHistoryIdList =
        JSON.parse(localStorage.getItem("orderHistory")) || [];
      setOrderHistoryIdList(orderHistoryIdList);

      if (orderHistoryIdList.length > 0) {
        const orderHistory = orders?.filter((order) =>
          orderHistoryIdList?.includes(order.orderId)
        );
        setOrderHistoryList(orderHistory);
      }
    };

    fetchOrders();

    // fetch order when local storage is updated
    const handleStorageUpdate = () => {
      fetchOrders();
    };

    window.addEventListener("localStorageUpdated", handleStorageUpdate);

    return () => {
      window.removeEventListener("localStorageUpdated", handleStorageUpdate);
    };
  }, []);

  // search order by order id
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchKeyword.trim() === "") {
      const orderHistory = orderList?.filter((order) =>
        orderHistoryIdList?.includes(order.orderId)
      );
      setOrderHistoryList(orderHistory);
      return;
    }

    const filtered = orderList?.filter(
      (order) => order.orderId.toLowerCase() === searchKeyword.toLowerCase()
    );

    setOrderHistoryList(filtered);
  };

  return (
    <section className="mt-12">
      <div>
        <div className="flex flex-col md:flex-row md:items-end  gap-4 justify-between">
          {/* dragon with title */}
          <motion.div
            variants={fadeIn(
              {
                default: "right",
              },
              0.3,
              "all"
            )}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-end w-full"
          >
            <span className=" text-[28px] sm:text-3xl text-dark dark:text-white/90 font-primary">
              Your Previous Order
            </span>
          </motion.div>

          {/* search bar */}
          <motion.form
            variants={fadeIn(
              {
                default: "ledt",
              },
              0.3,
              "all"
            )}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full lg:w-auto md:min-w-[300px]"
            onSubmit={handleSearch}
          >
            <div className="flex items-center gap-3 px-4 py-2 border border-gray-800">
              {/* search input */}
              <input
                className="outline-none border-none p-1 w-full bg-transparent"
                type="text"
                placeholder={"Search by Order ID.."}
                name="search"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  if (e.target.value.trim() === "") {
                    const orderHistory = orderList?.filter((order) =>
                      orderHistoryIdList?.includes(order.orderId)
                    );
                    setOrderHistoryList(orderHistory);
                  }
                }}
              />

              {/* search icon */}
              <div onClick={handleSearch} className="cursor-pointer">
                <FaSearch />
              </div>
            </div>
          </motion.form>
        </div>

        {/*table order history */}
        <div className="flex flex-col mt-5">
          <div
            className="overflow-x-auto sm:mx-0.5 lg:mx-0.5"
            id="orderHistory"
          >
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b dark:border-gray-800 ">
                    <tr>
                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Order ID
                      </th>
                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="text-md font-bold text-gray-600 dark:text-white/90 px-6 py-4 text-left truncate"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody key={orderList.length}>
                    {/* if there is no order */}
                    {orderList && orderList.length === 0 && (
                      <tr
                        variants={fadeIn(
                          {
                            default: "up",
                          },
                          0.3,
                          "all"
                        )}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.3 }}
                        className=" border-b"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap font-medium text-gray-600 dark:text-white/80  text-center text-sm"
                          colSpan="6"
                        >
                          Loading...
                        </td>
                      </tr>
                    )}

                    {/* if there is no order */}
                    {orderList.length > 0 && orderHistoryList.length === 0 && (
                      <tr
                        variants={fadeIn(
                          {
                            default: "up",
                          },
                          0.3,
                          "all"
                        )}
                        initial="hidden"
                        whileInView={"show"}
                        viewport={{ once: true, amount: 0.3 }}
                        className="border-b dark:border-gray-800"
                      >
                        <td
                          className="px-6 py-4 whitespace-nowrap font-medium text-gray-600 dark:text-white/80 text-center text-sm"
                          colSpan="6"
                        >
                          <p className="text-gray-600 dark:text-white/80 mt-4">
                            No Orders found!
                          </p>
                          <p className="text-gray-600 dark:text-white/80 mt-4">
                            You can input your order ID in the search bar to
                            find your order!
                          </p>
                          {orderHistoryIdList.length > 0 && (
                            <div
                              className="mt-3 p-3 py-2 h-full text-center rounded bg-blue-500/20 text-blue-500 border-blue-600 border text-xs w-fit mx-auto"
                              onClick={() => {
                                const orderHistory = orderList?.filter(
                                  (order) =>
                                    orderHistoryIdList?.includes(order.orderId)
                                );
                                setOrderHistoryList(orderHistory);

                                setSearchKeyword("");
                              }}
                            >
                              Show all
                            </div>
                          )}
                        </td>
                      </tr>
                    )}

                    {/* listing all the order history */}
                    {orderHistoryList &&
                      orderHistoryList.map((order, index) => {
                        return (
                          <>
                            <motion.tr
                              variants={fadeIn(
                                {
                                  default: "left",
                                },
                                0.3,
                                "all"
                              )}
                              initial="hidden"
                              whileInView={"show"}
                              viewport={{ once: true, amount: 0.3 }}
                              className="border-b dark:border-gray-800"
                              key={order.orderId}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 dark:text-white/80 ">
                                {order.orderId}
                              </td>
                              <td className="text-sm text-gray-600 dark:text-white/80  font-light px-6 py-4 whitespace-nowrap">
                                {order.fullName}
                              </td>
                              <td className="text-sm text-gray-600 dark:text-white/80  font-light px-6 py-4 whitespace-nowrap">
                                {order.date}
                              </td>
                              <td className="text-sm text-gray-600 dark:text-white/80  font-light px-6 py-4 whitespace-nowrap">
                                $ {order.total}
                              </td>
                              <td className="text-sm text-gray-600 dark:text-white/80  font-light px-6 py-4 whitespace-nowrap flex justify-center">
                                <StatusColor status={order.status} />
                              </td>
                              <td className="text-sm text-gray-600 dark:text-white/80  font-light px-6 py-4 whitespace-nowrap">
                                <button
                                  onClick={() =>
                                    setShowOrderDetail({
                                      status: true,
                                      id: order.orderId,
                                    })
                                  }
                                  className="p-4 py-2  h-full text-center rounded bg-tertiary border-tertiary border text-white text-xs w-fit"
                                >
                                  View Detail
                                </button>
                              </td>
                            </motion.tr>
                            {/* order detail popup */}

                            <div>
                              {showOrderDetail.status &&
                                showOrderDetail.id == order.orderId && (
                                  <OrderDetail
                                    setShowOrderDetail={setShowOrderDetail}
                                    order={order}
                                  />
                                )}
                            </div>
                          </>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const OrderDetail = ({ setShowOrderDetail, order }) => {
  return (
    <>
      <div className="fixed inset-0 bg-slate-900/20 backdrop-blur grid place-content-center text-black z-[300]">
        <div
          className="overflow-auto my-10 pt-0 w-fit relative"
          id="orderHistory"
        >
          <div className="w-[calc(100vw-18px)] sm:w-[calc(100vw-100px)] md:w-[600px] lg:w-[700px] bg-white">
            {/* title */}
            <div className="px-6  sticky top-0 bg-white z-10">
              <div className="pb-3 pt-5 mb-4 border-b-4 border-gray-400  bg-white flex justify-between items-center gap-4 ">
                <h2 className="text-2xl font-bold">Order Detail</h2>

                <div
                  onClick={() =>
                    setShowOrderDetail({
                      status: false,
                      id: null,
                    })
                  }
                  className="cursor-pointer hover:text-primary"
                >
                  <FaWindowClose size={18} />
                </div>
              </div>
            </div>

            {/* order detail information */}
            <div className="p-6 pt-1">
              <OrderDetailCard {...order} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistorySection;
