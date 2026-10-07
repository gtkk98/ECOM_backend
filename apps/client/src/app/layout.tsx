import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import PageTransition from "@/components/PageTransition";
import { canonicalUrl, siteUrl } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "ChowUp | Good food, made easy",
    template: "%s | ChowUp",
  },
  description: "Order crave-worthy comfort food from the ChowUp kitchen.",
  applicationName: "ChowUp",
  icons: {
    icon: "/logo2.png",
  },
  keywords: ["ChowUp", "food delivery", "pizza", "burgers", "pasta", "desserts"],
  alternates: canonicalUrl("/") ? { canonical: canonicalUrl("/") } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ChowUp",
    title: "ChowUp | Good food, made easy",
    description: "Order crave-worthy comfort food from the ChowUp kitchen.",
    images: [{
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200",
      width: 1200,
      height: 800,
      alt: "Freshly baked ChowUp pizza",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChowUp | Good food, made easy",
    description: "Order crave-worthy comfort food from the ChowUp kitchen.",
    images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="site-shell">
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <Footer />
        </div>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
