import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Troca e Devolução - SuaFarmácia",
  description: "Política de troca e devolução da SuaFarmácia. Saiba como trocar ou devolver produtos, prazos e condições para sua satisfação garantida.",
  keywords: [
    "troca devolução",
    "política troca",
    "devolução farmácia",
    "garantia produtos",
    "satisfação garantida"
  ],
  openGraph: {
    title: "Troca e Devolução - SuaFarmácia",
    description: "Política de troca e devolução da SuaFarmácia. Saiba como trocar ou devolver produtos.",
    url: "https://suafarmacia.com.br/troca-devolucao",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Troca e Devolução - SuaFarmácia",
    description: "Política de troca e devolução da SuaFarmácia.",
  },
  alternates: {
    canonical: "/troca-devolucao",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ReturnPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
