import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Troca e Devolução - Dinivix",
  description: "Política de troca e devolução da Dinivix. Saiba como trocar ou devolver produtos, prazos e condições para sua satisfação garantida.",
  keywords: [
    "troca devolução",
    "política troca",
    "devolução farmácia",
    "garantia produtos",
    "satisfação garantida"
  ],
  openGraph: {
    title: "Troca e Devolução - Dinivix",
    description: "Política de troca e devolução da Dinivix. Saiba como trocar ou devolver produtos.",
    url: "https://www.fernandoesdras.store/troca-devolucao",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Troca e Devolução - Dinivix",
    description: "Política de troca e devolução da Dinivix.",
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
