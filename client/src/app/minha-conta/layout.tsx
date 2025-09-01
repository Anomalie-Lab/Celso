import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Conta - SuaFarmácia",
  description: "Gerencie sua conta na SuaFarmácia. Visualize pedidos, endereços, lista de desejos e informações pessoais. Farmácia online segura e confiável.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Minha Conta - SuaFarmácia",
    description: "Gerencie sua conta na SuaFarmácia. Visualize pedidos, endereços e informações pessoais.",
    url: "https://suafarmacia.com.br/minha-conta",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Minha Conta - SuaFarmácia",
    description: "Gerencie sua conta na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}