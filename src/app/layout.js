import "./globals.css";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata = {
  title: "ERobot Cambodia",
  description: "Welcome to Erobot official website",
  openGraph: {
    title: "ERobot Cambodia",
    description: "Welcome to Erobot official website",
    url: baseUrl,
    siteName: "ERobot Cambodia",
    images: [
      {
        url: `${baseUrl}/images/banner.png`,
        width: 1200,
        height: 630,
        alt: "ERobot Cambodia Official Banner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ERobot Cambodia",
    description: "Welcome to Erobot official website",
    images: [`${baseUrl}/images/banner.png`],
  },
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
