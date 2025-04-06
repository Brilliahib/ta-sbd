import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organisms/GlobalProvider";
import ButtonChatBot from "@/components/atoms/button/ButtonChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vintagee | Preloved, Stylish, Unstoppable!",
  description:
    "Beli & jual fashion preloved yang tetap keren dan penuh karakter. Gaya baru dimulai di sini, hanya di Vintagee!",
  icons: [
    { rel: "icon", url: "/images/favicon/favicon.ico", sizes: "16x16" },
    { rel: "icon", url: "/images/favicon/favicon-32x32.png", sizes: "32x32" },
    {
      rel: "apple-touch-icon",
      url: "/images/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/images/favicon/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: "/images/favicon/android-chrome-512x512.png",
      sizes: "512x512",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          {children}
          <ButtonChatBot />
        </GlobalProvider>
      </body>
    </html>
  );
}
