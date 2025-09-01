import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus Endereços - SuaFarmácia",
  description: "Gerencie seus endereços de entrega na SuaFarmácia. Adicione, edite ou remova endereços para receber seus pedidos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Meus Endereços - SuaFarmácia",
    description: "Gerencie seus endereços de entrega na SuaFarmácia.",
    url: "https://suafarmacia.com.br/minha-conta/enderecos",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Endereços - SuaFarmácia",
    description: "Gerencie seus endereços de entrega na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta/enderecos",
  },
};

export default function AddressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
