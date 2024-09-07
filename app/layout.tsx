import {Roboto} from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// Load Inter font from Google Fonts

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
});


export const metadata: Metadata = {
  title: "AegisIndia",
  description: "AegisIndia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
