"use client";
import { useQuery } from "react-query";
import { getProducts } from "@/queries/product";
import { useProductContext } from "@/contexts/ProductContext";
import { useEffect, useState } from "react";
import SearchForm from "@/components/form/SearchForm";
import { FaHeart } from "react-icons/fa";
import ProductCard from "@/components/ui/ProductCard";
import { useCartContext } from "@/contexts/CartContext";
import ItemCartQuantity from "@/components/ui/ItemCartQuantity";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
const ProductsPage = ({ initialData, productCategories, query }) => {
  const { cartItems } = useCartContext();
  const { state: products, setState } = useProductContext();
  const { data, isLoading, isError } = useQuery(
    "products", // queryKey
    getProducts, // Custom hook used here
    {
      initialData, // Use the server-side fetched data as initial cache
      staleTime: 60000,
    }
  );
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [visibleCount, setVisibleCount] = useState(8); // Initial number of products to display

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Increase visible products by 3
  };

  // Update the visible products in the context state
  useEffect(() => {
    const visibleProducts = products.slice(0, visibleCount);
    setVisibleProducts(visibleProducts);
  }, [visibleCount, setState, products]);

  // Filter products and update the state based on the search query
  useEffect(() => {
    if (data) {
      const filteredProducts = query
        ? data.filter(
            (product) =>
              product.name.toLowerCase().includes(query.toLowerCase()) ||
              product.categoryId
                .toLowerCase()
                .includes(
                  query.includes("filter")
                    ? query.replace("filter", "").toLowerCase()
                    : query.toLowerCase()
                )
          )
        : data;

      setState(filteredProducts);

      // set only visibleCount to show
      const visibleProducts = filteredProducts.slice(0, visibleCount);
      setVisibleProducts(visibleProducts);
    }
  }, [query, data, setState, visibleCount]);

  const getCategoryName = (id) => {
    console.log(productCategories);
    const category = productCategories.find(
      (category) => category.id.toLowerCase() === id.toLowerCase()
    );
    console.log(category);
    return category?.categoryName ? category.categoryName : "Category";
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <main className="container py-8 md:py-12">
      <ItemCartQuantity number={cartItems?.length} />
      <div className="flex flex-col items-start lg:flex-row justify-between lg:items-center lg:gap-8">
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
          className="text-30-semibold w-full text-dark dark:text-white/90"
        >
          {query && !query.includes("filter") ? (
            `Search results for "${query}"`
          ) : (
            <h3 className="font-bold text-3xl md:text-4xl hidden lg:block truncate font-primary">
              Our Products
            </h3>
          )}
        </motion.div>{" "}
        <motion.div
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
          className="w-full sm:w-fit "
        >
          <SearchForm
            actionPath="/products"
            query={
              query?.includes("filter")
                ? getCategoryName(query?.replace("filter", ""))
                : query
            }
          />
        </motion.div>
      </div>

      <ul className="mt-7 product_grid">
        {products?.length > 0 ? (
          visibleProducts?.map((product) => {
            const category = productCategories.find(
              (category) => category.id === product.categoryId
            );

            return (
              <motion.div
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
                key={product.id}
              >
                <ProductCard
                  product={{ ...product, categoryName: category?.categoryName }}
                />
              </motion.div>
            );
          })
        ) : (
          <motion.p
            variants={fadeIn(
              {
                default: "up",
              },
              0.3,
              "all"
            )}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="no-results"
          >
            No products found!
          </motion.p>
        )}
      </ul>

      <div className="flex justify-center mt-4">
        {visibleCount < products.length && ( // Show "See More" button only if there are more products
          <button
            onClick={handleSeeMore}
            className="flex items-center gap-2 bg-white dark:bg-transparent dark:text-white dark:border-white text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg"
          >
            <span>
              <FaHeart />
            </span>{" "}
            View More
          </button>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
