
import Header from "@/components/layout/header";
import "./globals.css";
import {  Montserrat } from 'next/font/google';
import Footer from "@/components/layout/footer";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable}`}>
        <Header/>
        <div className="pt-32">
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
``