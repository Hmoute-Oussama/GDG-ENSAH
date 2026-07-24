import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/Layout/SmoothScrollProvider";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import BackgroundCanvas from "@/components/Canvas/BackgroundCanvas";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDG ENSAH | Premium Developer Community",
  description: "Google Developer Groups ENSAH - An immersive web platform for tech enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-transparent text-foreground overflow-x-hidden selection:bg-[var(--google-blue)] selection:text-white">
        <BackgroundCanvas />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
