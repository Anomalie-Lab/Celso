import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - SuaFarmácia",
  description: "Conheça a política de privacidade da SuaFarmácia. Como protegemos seus dados pessoais e informações de compra na nossa farmácia online.",
  keywords: [
    "política de privacidade",
    "privacidade farmácia",
    "proteção dados",
    "LGPD",
    "dados pessoais"
  ],
  openGraph: {
    title: "Política de Privacidade - SuaFarmácia",
    description: "Conheça a política de privacidade da SuaFarmácia. Como protegemos seus dados pessoais.",
    url: "https://suafarmacia.com.br/politica-de-privacidade",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Política de Privacidade - SuaFarmácia",
    description: "Conheça a política de privacidade da SuaFarmácia.",
  },
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
