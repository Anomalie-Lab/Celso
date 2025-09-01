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
          <Toaster
            position="bottom-right"
            toastOptions={{
              classNames: {
                toast: "!bg-white",
                success: "!border-l-8 !border-primary", 
                error: "!border-l-8 !border-red-500", 
                warning: "!border-l-8 !border-yellow-500"
              },
            }}
          />
          <Header />
          <div className="pt-32">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
