"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { ProductProvider } from "@/contexts/ProductContext";
const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <ArticleProvider>
            <Header />
            {children}
            <Footer />
          </ArticleProvider>
        </ProductProvider>
      </QueryClientProvider>
    </>
  );
}

export default Layout;
