import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Dinivix",
  description: "Gerencie suas preferências de newsletter na Dinivix. Receba ofertas exclusivas, novidades e promoções personalizadas.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Newsletter - Dinivix",
    description: "Gerencie suas preferências de newsletter na Dinivix.",
    url: "https://www.fernandoesdras.store/minha-conta/newsletter",
    siteName: "Dinivix",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Newsletter - Dinivix",
    description: "Gerencie suas preferências de newsletter na Dinivix.",
  },
  alternates: {
    canonical: "/minha-conta/newsletter",
  },
};

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
