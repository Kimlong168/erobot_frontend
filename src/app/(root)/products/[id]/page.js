import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import BackToPrevBtn from "@/components/ui/BackToPrevBtn";
import { getProductById } from "@/queries/product";
import { notFound } from "next/navigation";
import Comment from "@/components/ui/Comment";
import ProductDetailCard from "@/components/ui/ProductDetailCard";
import { getProductCategories } from "@/queries/productCategory";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ProductDetail = async ({ params }) => {
  const id = (await params).id;

  const product = await getProductById(id);
  const categories = await getProductCategories();

  const category = categories.find(
    (category) => category.id === product.categoryId
  );

  if (!product) return notFound();

  return (
    <section className="container mt-6 overflow-x-hidden">
      {/* detail card */}
      <div>
        <ProductDetailCard
          product={{ ...product, categoryName: category.categoryName }}
        />
      </div>

      {/* share button */}

      <div className="flex items-center justify-between py-3 border-y-2 border-gray-5 my-6 md:hidden">
        <span className="font-semibold">Share</span>
        <SharingBtn url={`${baseUrl}/products/${id}`} title={product.name} />
      </div>

      {/* comment section */}
      <div className="mt-12">
        <div id="disqus_thread"></div>
      </div>

      {/* back button */}
      <div className="lg:hidden mt-6 mb-12 ">
        <BackToPrevBtn link="/products" />
      </div>

      <Comment />
    </section>
  );
};

export default ProductDetail;
