export const revalidate = 86400;
import ProductsPage from "./components/ProductsPage";
import { db, collection, getDocs } from "@/libs/firebase";
export const metadata = {
  title: "ERobot | Products",
};
const ProductsServerComponent = async ({ searchParams }) => {
  const query = (await searchParams).query;

  // const params = { search: query || null };

  const [productsSnapshot, productCategorySnapshot] = await Promise.all([
    getDocs(collection(db, "products")),
    getDocs(collection(db, "product_category")),
  ]);

  // Map through the snapshots to get the documents
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const productCategories = productCategorySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <ProductsPage
      initialData={products}
      productCategories={productCategories}
      query={query}
    />
  );
};

export default ProductsServerComponent;
