import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Finalizar Compra | SuaFarmácia",
  description: "Finalize sua compra na SuaFarmácia de forma segura e rápida. Escolha o endereço de entrega, método de pagamento e confirme seu pedido.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Checkout - Finalizar Compra | SuaFarmácia",
    description: "Finalize sua compra na SuaFarmácia de forma segura e rápida.",
    url: "https://suafarmacia.com.br/checkout",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Checkout - Finalizar Compra | SuaFarmácia",
    description: "Finalize sua compra na SuaFarmácia de forma segura e rápida.",
  },
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
