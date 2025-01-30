export const revalidate = 86400;
import SharingBtn from "@/components/ui/SharingBtn";
import BackToPrevBtn from "@/components/ui/BackToPrevBtn";
import { getProductById, getProducts } from "@/queries/product";
import { notFound } from "next/navigation";
import Comment from "@/components/ui/Comment";
import ProductDetailCard from "@/components/ui/ProductDetailCard";
import { getProductCategories } from "@/queries/productCategory";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ✅ Function to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = await getProductById(id);

  return {
    title: `ERobot | ${product.name}`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/products/${id}`,
      images: [{ url: product.image }],
    },
  };
}

// // SSG: ✅ Function to generate static paths
// export async function generateStaticParams() {
//   const products = await getProducts();

//   return products.map((product) => ({
//     id: product.id.toString(),
//   }));
// }

const ProductDetail = async ({ params }) => {
  const id = (await params).id;

  const product = await getProductById(id);
  const categories = await getProductCategories();

  if (!product) return notFound();

  const category = categories.find(
    (category) => category.id === product?.categoryId
  );

  return (
    <>
      <main className="container mt-6 overflow-x-hidden">
        {/* detail card */}
        <div>
          <ProductDetailCard
            product={{
              ...product,
              id: id,
              categoryName: category.categoryName,
            }}
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
      </main>
    </>
  );
};

export default ProductDetail;
