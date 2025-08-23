import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/contexts/providers";
import Header from "@/components/layout/header";
import Footer from "@/sections/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.variable}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
