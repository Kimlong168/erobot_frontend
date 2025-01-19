"use client";
import assets from "@/assets/assets";
import { useCartContext } from "@/contexts/CartContext";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
const CartTable = () => {
  const {
    cartItems,
    addItemOrIncreaseQuantity,
    removeItem,
    decreaseQuantity,
    updateQuantity,
    clearCart,
  } = useCartContext();

  return (
    <section className="overflow-x-auto">
      <table className="w-full min-w-[300px]">
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
                <p className="text-gray-600 mt-4">Your cart is empty</p>
              </td>
            </tr>
          )}
          {cartItems?.map((item, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className=" py-4">
                <Image width={50} height={50} src={item.image} alt="product" />
              </td>
              <td className="pr-3">{item.name}</td>
              <td className="pr-3">${item.price}</td>
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
              <td className="pr-3">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
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
    </section>
  );
};

export default CartTable;
