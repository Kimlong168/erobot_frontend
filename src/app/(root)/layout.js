"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CartProvider } from "@/contexts/CartContext";
import GoToTop from "@/components/ui/GoToTop";
const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <ProductProvider>
            <ArticleProvider>
              <Header />
              {children}
              <Footer />
              {/* <GoToTop /> */}
            </ArticleProvider>
          </ProductProvider>
        </CartProvider>
      </QueryClientProvider>
    </>
  );
}

export default Layout;
