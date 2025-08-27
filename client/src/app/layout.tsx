import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/contexts/providers";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <Providers>
          <Toaster />
          <Header />
          <div className="pt-32">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
