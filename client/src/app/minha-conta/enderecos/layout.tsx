import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meus Endereços - Dinivix",
  description: "Gerencie seus endereços de entrega na Dinivix. Adicione, edite ou remova endereços para receber seus pedidos.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Meus Endereços - Dinivix",
    description: "Gerencie seus endereços de entrega na Dinivix.",
    url: "https://www.fernandoesdras.store/minha-conta/enderecos",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Meus Endereços - Dinivix",
    description: "Gerencie seus endereços de entrega na Dinivix.",
  },
  alternates: {
    canonical: "/minha-conta/enderecos",
  },
};

export default function AddressesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
