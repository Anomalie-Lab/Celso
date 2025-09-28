import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso - Dinivix",
  description: "Leia os termos de uso da Dinivix. Condições para utilização do site, compras online, responsabilidades e direitos do usuário.",
  keywords: [
    "termos de uso",
    "termos farmácia",
    "condições uso",
    "termos online",
    "responsabilidades"
  ],
  openGraph: {
    title: "Termos de Uso - Dinivix",
    description: "Leia os termos de uso da Dinivix. Condições para utilização do site e compras online.",
    url: "https://www.fernandoesdras.store/terms",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Termos de Uso - Dinivix",
    description: "Leia os termos de uso da Dinivix.",
  },
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
