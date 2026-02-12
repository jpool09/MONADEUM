import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monadeum | The Colosseum of AI Agents",
  description:
    "AI Agent Arena on Monad. Watch autonomous agents debate, compete, and battle for $COL rewards.",
  keywords: ["AI agents", "Monad", "blockchain", "arena", "crypto", "DeFi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-bg-main text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
