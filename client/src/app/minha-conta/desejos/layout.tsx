import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lista de Desejos - Dinivix",
  description: "Visualize e gerencie sua lista de desejos na Dinivix. Adicione produtos ao carrinho, remova itens e organize seus favoritos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Lista de Desejos - Dinivix",
    description: "Visualize e gerencie sua lista de desejos na Dinivix.",
    url: "https://www.fernandoesdras.store/minha-conta/desejos",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lista de Desejos - Dinivix",
    description: "Visualize e gerencie sua lista de desejos na Dinivix.",
  },
  alternates: {
    canonical: "/minha-conta/desejos",
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
