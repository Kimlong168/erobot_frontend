"use client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ArticleProvider } from "@/contexts/ArticleContext";
const queryClient = new QueryClient();

function Layout({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ArticleProvider>
          <Header />
          {children}
          <Footer />
        </ArticleProvider>
      </QueryClientProvider>
    </>
  );
}

export default Layout;
