import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de Desejos - SuaFarmácia",
  description: "Visualize e gerencie sua lista de desejos na SuaFarmácia. Adicione produtos ao carrinho, remova itens e organize seus favoritos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Lista de Desejos - SuaFarmácia",
    description: "Visualize e gerencie sua lista de desejos na SuaFarmácia.",
    url: "https://suafarmacia.com.br/minha-conta/desejos",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lista de Desejos - SuaFarmácia",
    description: "Visualize e gerencie sua lista de desejos na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta/desejos",
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
