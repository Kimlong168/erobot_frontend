"use client";
import Link from "next/link";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useCartContext } from "@/contexts/CartContext";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
const ProductCard = ({ product }) => {
  const { id, name, price, categoryId, categoryName, image } = product;

  const { cartItems, addItemOrIncreaseQuantity, removeItem } = useCartContext();

  const isItemInCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="startup-card group w-full">
      <div>
        <Link href={`/products/${id}`}>
          <h3 className="text-26-semibold line-clamp-1">{name}</h3>
        </Link>
      </div>
      <div>
        <Link href={`/products?query=filter${categoryId?.toLowerCase()}`}>
          <p className="text-16-medium mb-3">{categoryName}</p>
        </Link>

        <Link href={`/products/${id}`}>
          <Image
            src={image}
            width={500}
            height={500}
            alt="placeholder"
            className="startup-card_img"
          />{" "}
        </Link>
      </div>
      <div className="flex-between gap-3 mt-5">
        <div className="flex-1">
          <h3 className="text-26-semibold line-clamp-1">{price} $</h3>
        </div>
        {isItemInCart ? (
          <button
            onClick={() => {
              removeItem(product.id);
              enqueueSnackbar(`Remove ${name} from cart!`, {
                variant: "error",
                autoHideDuration: 1500,
              });
            }}
            className="startup-card_btn"
          >
            <IoCheckmarkDoneCircleSharp fill="white" />
          </button>
        ) : (
          <button
            onClick={() => {
              addItemOrIncreaseQuantity(product);
              enqueueSnackbar(`Add ${name} to cart!`, {
                variant: "success",
                autoHideDuration: 1500,
              });
            }}
            className="startup-card_btn"
          >
            <FaCartPlus fill="white" />
          </button>
        )}
      </div>
      {/* notify */}
      <SnackbarProvider />
    </div>
  );
};

export default ProductCard;
