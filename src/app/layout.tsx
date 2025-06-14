import type { Metadata } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MatrixEffect from "@/components/effects/MatrixEffect";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WarrantyAI - Never Miss a Warranty Again",
  description: "Smart AI assistant to track, manage, and remind users of all warranties, expiring services, and coverage. Own smart. Live smart.",
  keywords: "warranty tracking, AI assistant, receipt scanning, warranty management, smart reminders, 3D inventory, AR tracking",
  authors: [{ name: "WarrantyAI Team" }],
  creator: "WarrantyAI",
  publisher: "WarrantyAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://warrantyai.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WarrantyAI - Never Miss a Warranty Again",
    description: "Smart AI assistant to track, manage, and remind users of all warranties, expiring services, and coverage.",
    url: "https://warrantyai.com",
    siteName: "WarrantyAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WarrantyAI - Smart Warranty Management Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WarrantyAI - Never Miss a Warranty Again",
    description: "Smart AI assistant to track, manage, and remind users of all warranties, expiring services, and coverage.",
    images: ["/og-image.jpg"],
    creator: "@warrantyai",
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
  icons: {
    icon: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    shortcut: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
    apple: "https://raw.githubusercontent.com/HunterHo07/Portfolio_1/refs/heads/main/images/logo.webp",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased bg-black text-white min-h-screen`}
      >
        <div className="relative min-h-screen">
          {/* Matrix Background Effect */}
          <MatrixEffect opacity={0.05} speed={100} />

          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
