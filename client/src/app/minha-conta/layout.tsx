"use client"

import { LuUser, LuPackage, LuHeart, LuMapPin, LuMail, LuLogOut } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MinhaContaLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "resumo",
      label: "Resumo",
      icon: LuUser,
      description: "Visão geral da sua conta",
      href: "/minha-conta"
    },
    {
      id: "pedidos",
      label: "Meus Pedidos",
      icon: LuPackage,
      description: "Histórico de compras",
      href: "/minha-conta/pedidos"
    },
    {
      id: "desejos",
      label: "Lista de Desejos",
      icon: LuHeart,
      description: "Produtos favoritos",
      href: "/minha-conta/desejos"
    },
    {
      id: "enderecos",
      label: "Endereços",
      icon: LuMapPin,
      description: "Gerenciar endereços",
      href: "/minha-conta/enderecos"
    },
    {
      id: "newsletter",
      label: "Newsletter",
      icon: LuMail,
      description: "Preferências de email",
      href: "/minha-conta/newsletter"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/minha-conta") {
      return pathname === "/minha-conta";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-fit sticky top-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Minha Conta</h2>
              <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
            </div>

            <nav className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`w-full flex items-center border border-gray-100 gap-4 p-3 rounded-lg text-left cursor-pointer transition-all duration-200 ${
                      active
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:text-primary hover:bg-primary-50 group"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? "text-white" : "text-gray-500 group-hover:text-primary"}`} />
                    <div className="flex-1">
                      <div className={`font-medium ${active ? "text-white" : "text-gray-700 group-hover:text-primary"}`}>{item.label}</div>
                      <div className={`text-xs ${active ? "text-white" : "text-gray-500 group-hover:text-primary"}`}>{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <button className="w-full border border-gray-200 flex items-center justify-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer">
                <LuLogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinhaContaLayout;