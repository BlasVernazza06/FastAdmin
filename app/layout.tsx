import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FastAdmin | Modern High-Performance Dashboard",
    template: "%s | FastAdmin",
  },
  description: "The ultimate high-performance admin dashboard template. Built with Next.js and Tailwind CSS for speed, scalability, and premium aesthetics. Manage your data with elegance.",
  keywords: [
    "admin dashboard",
    "nextjs admin",
    "react dashboard",
    "tailwind css",
    "saas starter",
    "analytics",
    "fastadmin",
    "web application",
  ],
  authors: [{ name: "FastAdmin Team" }],
  creator: "FastAdmin",
  publisher: "FastAdmin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastadmin.app",
    title: "FastAdmin | Modern High-Performance Dashboard",
    description: "Experience the speed and elegance of FastAdmin. The premium dashboard solution for modern web applications.",
    siteName: "FastAdmin",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${dmSans.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
