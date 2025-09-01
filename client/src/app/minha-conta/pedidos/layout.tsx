import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus Pedidos - SuaFarmácia",
  description: "Visualize o histórico de seus pedidos na SuaFarmácia. Acompanhe o status das entregas e detalhes de todas as suas compras.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Meus Pedidos - SuaFarmácia",
    description: "Visualize o histórico de seus pedidos na SuaFarmácia.",
    url: "https://suafarmacia.com.br/minha-conta/pedidos",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Pedidos - SuaFarmácia",
    description: "Visualize o histórico de seus pedidos na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta/pedidos",
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
