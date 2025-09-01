import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nós - SuaFarmácia",
  description: "Conheça a SuaFarmácia, sua farmácia online de confiança. Mais de 10 anos de experiência em medicamentos, cosméticos e produtos de saúde com entrega rápida e segura.",
  keywords: [
    "sobre nós",
    "farmácia online",
    "história da farmácia",
    "missão e valores",
    "farmácia confiável",
    "medicamentos online"
  ],
  openGraph: {
    title: "Sobre Nós - SuaFarmácia",
    description: "Conheça a SuaFarmácia, sua farmácia online de confiança. Mais de 10 anos de experiência em medicamentos e produtos de saúde.",
    url: "https://suafarmacia.com.br/sobre-nos",
    siteName: "SuaFarmácia",
    images: [
      {
        url: "/images/about-og.jpg",
        width: 1200,
        height: 630,
        alt: "Sobre Nós - SuaFarmácia",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nós - SuaFarmácia",
    description: "Conheça a SuaFarmácia, sua farmácia online de confiança.",
    images: ["/images/about-twitter.jpg"],
    creator: "@suafarmacia",
  },
  alternates: {
    canonical: "/sobre-nos",
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
