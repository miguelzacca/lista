import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shared Grocery List",
  description: "Collaborative grocery list",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased selection:bg-brand-500/30`}>
        <div className="gradient-bg" />
        <main className="mx-auto max-w-md min-h-screen p-4 pb-24 relative">
          {children}
        </main>
      </body>
    </html>
  );
}
