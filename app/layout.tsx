import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ weight: "variable", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "LoveMe",
  description: "A playful proposal app accepting no for an answer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
