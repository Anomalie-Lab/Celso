import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - SuaFarmácia",
  description: "Conheça a história da SuaFarmácia. Farmácia online comprometida com a saúde e bem-estar, oferecendo produtos de qualidade e atendimento diferenciado.",
  keywords: [
    "sobre nós",
    "história farmácia",
    "quem somos",
    "missão farmácia",
    "valores farmácia"
  ],
  openGraph: {
    title: "Sobre Nós - SuaFarmácia",
    description: "Conheça a história da SuaFarmácia. Farmácia online comprometida com a saúde e bem-estar.",
    url: "https://suafarmacia.com.br/sobre-nos",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sobre Nós - SuaFarmácia",
    description: "Conheça a história da SuaFarmácia.",
  },
  alternates: {
    canonical: "/sobre-nos",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
