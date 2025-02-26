"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArticleProvider } from "@/contexts/ArticleContext";
import { ProductProvider } from "@/contexts/ProductContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SnackbarProvider } from "notistack";
const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <CartProvider>
            <ProductProvider>
              <ArticleProvider>
                <Header />
                {children}
                <Footer />

                <SnackbarProvider />
              </ArticleProvider>
            </ProductProvider>
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default Layout;
