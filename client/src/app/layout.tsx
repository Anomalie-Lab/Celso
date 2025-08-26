import "./globals.css";
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/contexts/providers";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${inter.variable}`}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}