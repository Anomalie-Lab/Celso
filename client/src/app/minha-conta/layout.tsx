import type { Metadata } from "next";
import Sidebar from "@/components/account/sidebar";

export const metadata: Metadata = {
  title: "Minha Conta - SuaFarmácia",
  description: "Gerencie sua conta na SuaFarmácia. Visualize pedidos, endereços, lista de desejos e informações pessoais. Farmácia online segura e confiável.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Minha Conta - SuaFarmácia",
    description: "Gerencie sua conta na SuaFarmácia. Visualize pedidos, endereços e informações pessoais.",
    url: "https://suafarmacia.com.br/minha-conta",
    siteName: "SuaFarmácia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Minha Conta - SuaFarmácia",
    description: "Gerencie sua conta na SuaFarmácia.",
  },
  alternates: {
    canonical: "/minha-conta",
  },
};

const MinhaContaLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 flex-wrap">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default MinhaContaLayout;
