import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus Pedidos - Dinivix",
  description: "Visualize o histórico de seus pedidos na Dinivix. Acompanhe o status das entregas e detalhes de todas as suas compras.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Meus Pedidos - Dinivix",
    description: "Visualize o histórico de seus pedidos na Dinivix.",
    url: "https://www.fernandoesdras.store/minha-conta/pedidos",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Pedidos - Dinivix",
    description: "Visualize o histórico de seus pedidos na Dinivix.",
  },
  alternates: {
    canonical: "/minha-conta/pedidos",
  },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
