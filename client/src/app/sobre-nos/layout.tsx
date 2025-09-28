import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - Dinivix",
  description: "Conheça a história da Dinivix. Farmácia online comprometida com a saúde e bem-estar, oferecendo produtos de qualidade e atendimento diferenciado.",
  keywords: [
    "sobre nós",
    "história farmácia",
    "quem somos",
    "missão farmácia",
    "valores farmácia"
  ],
  openGraph: {
    title: "Sobre Nós - Dinivix",
    description: "Conheça a história da Dinivix. Farmácia online comprometida com a saúde e bem-estar.",
    url: "https://www.fernandoesdras.store/sobre-nos",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sobre Nós - Dinivix",
    description: "Conheça a história da Dinivix.",
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
