import "./globals.css";

export const metadata = {
  title: "Erbot Cambodia",
  description: "Welcome to erbotcambodia.org",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white`}>{children}</body>
    </html>
  );
}
