export const revalidate = 86400;
export const dynamic = "force-static";

import { getProducts } from "@/queries/product";
import { getProductCategories } from "@/queries/productCategory";
import ProductsPage from "./components/ProductsPage";

export const metadata = {
  title: "ERobot | Products",
};

const ProductsServerComponent = async ({ searchParams }) => {
  const query = searchParams?.query ?? "";

  const [products, productCategories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <ProductsPage
      initialData={products}
      productCategories={productCategories}
      query={query}
    />
  );
};

export default ProductsServerComponent;
