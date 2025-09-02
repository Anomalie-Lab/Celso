import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - SuaFarmácia",
  description: "Gerencie suas preferências de newsletter na SuaFarmácia. Receba ofertas exclusivas, novidades e promoções personalizadas.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Newsletter - SuaFarmácia",
    description: "Gerencie suas preferências de newsletter na SuaFarmácia.",
    url: "https://suafarmacia.com.br/minha-conta/newsletter",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Newsletter - SuaFarmácia",
    description: "Gerencie suas preferências de newsletter na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta/newsletter",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
