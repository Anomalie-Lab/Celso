import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale Conosco - SuaFarmácia",
  description: "Entre em contato com a SuaFarmácia. Atendimento ao cliente, suporte, dúvidas sobre produtos e informações de contato da farmácia online.",
  keywords: [
    "fale conosco",
    "contato farmácia",
    "atendimento farmácia",
    "suporte farmácia",
    "contato online"
  ],
  openGraph: {
    title: "Fale Conosco - SuaFarmácia",
    description: "Entre em contato com a SuaFarmácia. Atendimento ao cliente e suporte.",
    url: "https://suafarmacia.com.br/fale-conosco",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Fale Conosco - SuaFarmácia",
    description: "Entre em contato com a SuaFarmácia.",
  },
  alternates: {
    canonical: "/fale-conosco",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
