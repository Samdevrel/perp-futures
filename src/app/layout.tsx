import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Perp Futures DEX | @samdevrel",
  description: "24/7 perpetual futures trading with up to 200x leverage on crypto and indices.",
  keywords: ["perpetual", "futures", "leverage", "trading", "dex", "derivatives"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
