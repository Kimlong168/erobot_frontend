import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
export const metadata = {
  title: "Erbot Cambodia",
  description: "Welcome to erbotcambodia.org",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased font-secondary`}>
        <Header />
        {children}
        {/* <div className="min-h-screen min-w-screen container py-12">hi</div> */}
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
