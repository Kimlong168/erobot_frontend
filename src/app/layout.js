import "./globals.css";
export const metadata = {
  title: "ERobot Cambodia",
  description: "Welcome to Erobotcambodia official website",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-secondary dark:bg-dark-mode dark:text-white max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
