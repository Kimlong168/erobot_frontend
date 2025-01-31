export const revalidate = 86400;
import { getProducts } from "@/queries/product";
import ProductsPage from "./components/ProductsPage";
import { getProductCategories } from "@/queries/productCategory";
export const metadata = {
  title: "ERobot | Products",
};
const ProductsServerComponent = async ({ searchParams }) => {
  const query = (await searchParams).query;

  // const [productsSnapshot, productCategorySnapshot] = await Promise.all([
  //   getDocs(collection(db, "products")),
  //   getDocs(collection(db, "product_category")),
  // ]);

  // // Map through the snapshots to get the documents
  // const products = productsSnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));

  // const productCategories = productCategorySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));

  const products = await getProducts();
  const productCategories = await getProductCategories();

  return (
    <ProductsPage
      initialData={products}
      productCategories={productCategories}
      query={query}
    />
  );
};

export default ProductsServerComponent;
