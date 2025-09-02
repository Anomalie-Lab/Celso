import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condições de Uso - SuaFarmácia",
  description: "Conheça as condições de uso da SuaFarmácia. Termos e condições para compras online, entrega, pagamento e políticas da farmácia.",
  keywords: [
    "condições de uso",
    "termos farmácia",
    "política farmácia",
    "condições compra",
    "termos online"
  ],
  openGraph: {
    title: "Condições de Uso - SuaFarmácia",
    description: "Conheça as condições de uso da SuaFarmácia. Termos e condições para compras online.",
    url: "https://suafarmacia.com.br/conditions",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Condições de Uso - SuaFarmácia",
    description: "Conheça as condições de uso da SuaFarmácia.",
  },
  alternates: {
    canonical: "/conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ConditionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
