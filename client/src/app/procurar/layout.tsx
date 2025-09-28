import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buscar Produtos - Farmácia Online",
  description: "Encontre medicamentos, cosméticos, suplementos e produtos de saúde na nossa farmácia online. Busca rápida e resultados precisos com entrega segura.",
  keywords: [
    "buscar produtos",
    "farmácia online",
    "medicamentos",
    "cosméticos",
    "suplementos",
    "produtos de saúde",
    "busca farmácia"
  ],
  openGraph: {
    title: "Buscar Produtos - Farmácia Online",
    description: "Encontre medicamentos, cosméticos, suplementos e produtos de saúde na nossa farmácia online.",
    url: "https://suafarmacia.com.br/search",
    siteName: "SuaFarmácia",
    images: [
      {
        url: "/images/search-og.jpg",
        width: 1200,
        height: 630,
        alt: "Buscar Produtos - SuaFarmácia",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buscar Produtos - Farmácia Online",
    description: "Encontre medicamentos, cosméticos, suplementos e produtos de saúde na nossa farmácia online.",
    images: ["/images/search-twitter.jpg"],
    creator: "@suafarmacia",
  },
  alternates: {
    canonical: "/search",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
