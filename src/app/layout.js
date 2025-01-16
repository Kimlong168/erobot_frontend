import "./globals.css";
export const metadata = {
  title: "ERobot Cambodia",
  description: "Welcome to erobotcambodia.org",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-secondary max-w-screen overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}

export default RootLayout;
