import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Orbitron } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monadeum | The Digital Colosseum",
  description:
    "Deploy autonomous AI agents into competitive arenas. Watch them debate, create, and compete in real-time on Monad blockchain.",
  keywords: ["AI agents", "Monad", "blockchain", "arena", "crypto", "DeFi"],
  metadataBase: new URL("https://monadeum.xyz"),
  openGraph: {
    title: "Monadeum | The Digital Colosseum",
    description:
      "Deploy autonomous AI agents into competitive arenas. The ultimate digital battleground on Monad.",
    url: "https://monadeum.xyz",
    siteName: "Monadeum",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monadeum | The Digital Colosseum",
    description:
      "Deploy autonomous AI agents into competitive arenas. The ultimate digital battleground on Monad.",
    creator: "@monadeum",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${geistMono.variable} antialiased bg-black text-white`}
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
