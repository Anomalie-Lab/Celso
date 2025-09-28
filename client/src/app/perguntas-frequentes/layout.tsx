import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perguntas Frequentes - Dinivix",
  description: "Encontre respostas para as principais dúvidas sobre a Dinivix. FAQ sobre entrega, pagamento, produtos, trocas e devoluções.",
  keywords: [
    "perguntas frequentes",
    "FAQ farmácia",
    "dúvidas farmácia",
    "perguntas comuns",
    "ajuda farmácia"
  ],
  openGraph: {
    title: "Perguntas Frequentes - Dinivix",
    description: "Encontre respostas para as principais dúvidas sobre a Dinivix. FAQ sobre entrega, pagamento e produtos.",
    url: "https://www.fernandoesdras.store/perguntas-frequentes",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Perguntas Frequentes - Dinivix",
    description: "Encontre respostas para as principais dúvidas sobre a Dinivix.",
  },
  alternates: {
    canonical: "/perguntas-frequentes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
