import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { WhatsAppFloatingButton } from "@/components/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bricolage Grotesque font
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Bricolage font variants
const bricolageDisplay = {
  variable: "--font-bricolage-display",
  className: "font-bricolage-display",
};

const bricolageText = {
  variable: "--font-bricolage-text", 
  className: "font-bricolage-text",
};

export const metadata: Metadata = {
  title: "Abhishek Banerji - Portfolio",
  description: "Portfolio website of Abhishek Banerji",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${bricolageDisplay.variable} ${bricolageText.variable} antialiased`}
      >
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
