import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LiveChat from "@/components/chat/LiveChat";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-body-font",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "SponsrBridge — Conference Sponsorship Revenue Architecture",
  description: "SponsrBridge is a strategic sponsorship revenue consultancy that operates as an embedded commercial team for B2B conferences.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
