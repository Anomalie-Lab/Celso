import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade - Dinivix",
  description: "Conheça a política de privacidade da Dinivix. Como protegemos seus dados pessoais e informações de compra na nossa farmácia online.",
  keywords: [
    "política de privacidade",
    "privacidade farmácia",
    "proteção dados",
    "LGPD",
    "dados pessoais"
  ],
  openGraph: {
    title: "Política de Privacidade - Dinivix",
    description: "Conheça a política de privacidade da Dinivix. Como protegemos seus dados pessoais.",
    url: "https://www.fernandoesdras.store/politica-de-privacidade",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Política de Privacidade - Dinivix",
    description: "Conheça a política de privacidade da Dinivix.",
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
