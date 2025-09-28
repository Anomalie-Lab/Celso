import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formas de Pagamento - Dinivix",
  description: "Conheça as formas de pagamento aceitas na Dinivix. Cartão de crédito, débito, PIX, boleto e outras opções seguras para suas compras.",
  keywords: [
    "formas de pagamento",
    "pagamento farmácia",
    "cartão crédito",
    "PIX",
    "boleto",
    "pagamento seguro"
  ],
  openGraph: {
    title: "Formas de Pagamento - Dinivix",
    description: "Conheça as formas de pagamento aceitas na Dinivix. Cartão, PIX, boleto e outras opções seguras.",
    url: "https://www.fernandoesdras.store/formas-de-pagamento",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Formas de Pagamento - Dinivix",
    description: "Conheça as formas de pagamento aceitas na Dinivix.",
  },
  alternates: {
    canonical: "/formas-de-pagamento",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PaymentMethodsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
