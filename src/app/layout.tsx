import type { Metadata } from "next";
import { Gajraj_One, Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gajrajOne = Gajraj_One({
  variable: "--font-gajraj-one",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: "400",
});

export const metadata: Metadata = {
  title: "bEDH",
  description:
    "Rules for Magic The Gathering Budget Elder Dragon Highlander and utilities to play.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gajrajOne.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Header />
        {children}
      </body>
      <GoogleAnalytics gaId="G-Z1R7FGJEQG" />
      <GoogleTagManager gtmId="GTM-M2QCGLZN" />
    </html>
  );
}
