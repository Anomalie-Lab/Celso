"use client"

import { LuUser, LuPackage, LuHeart, LuMapPin, LuMail, LuLogOut } from "react-icons/lu";

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AccountSidebar({ activeTab, onTabChange }: AccountSidebarProps) {
  const menuItems = [
    {
      id: "resumo",
      label: "Resumo",
      icon: LuUser,
      description: "Visão geral da sua conta"
    },
    {
      id: "pedidos",
      label: "Meus Pedidos",
      icon: LuPackage,
      description: "Histórico de compras"
    },
    {
      id: "desejos",
      label: "Lista de Desejos",
      icon: LuHeart,
      description: "Produtos favoritos"
    },
    {
      id: "enderecos",
      label: "Endereços",
      icon: LuMapPin,
      description: "Gerenciar endereços"
    },
    {
      id: "newsletter",
      label: "Newsletter",
      icon: LuMail,
      description: "Preferências de email"
    },
  ];

  return (
    <div className="w-80 bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Minha Conta</h2>
        <p className="text-sm text-gray-500">Gerencie suas informações pessoais</p>
      </div>

      <nav className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center border border-gray-100 gap-4 p-3 rounded-lg text-left cursor-pointer transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary"
                  : "text-gray-600 hover:text-primary hover:bg-primary-50 group"
              }`}
            >
              <Icon className={`w-5 h-5 group-hover:text-primary ${isActive ? "text-white" : "text-gray-500"}`} />
              <div className="flex-1">
                <div className={`font-regular group-hover:text-primary ${isActive ? "text-white" : "text-gray-700"}`}>{item.label}</div>
                <div className={`text-xs font-regular group-hover:text-primary ${isActive ? "text-white" : "text-gray-700"}`}>{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-6">
        <button className="w-full border border-gray-200 flex items-center justify-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer">
          <LuLogOut className="w-5 h-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </div>
  );
}
