"use client"

import { LucideEdit } from "lucide-react";
import { LuUser, LuMail, LuPhone, LuCalendar, LuMapPin,LuPackage, LuHeart } from "react-icons/lu";

export default function ResumeTab() {
  const userInfo = {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    birthDate: "15/03/1990",
    address: "Rua das Flores, 123 - São Paulo, SP",
    memberSince: "Janeiro 2023"
  };

  const stats = [
    { label: "Pedidos Realizados", value: "12", color: "blue" },
    { label: "Produtos Favoritos", value: "8", color: "pink" },
    { label: "Endereços Cadastrados", value: "3", color: "green" },
    { label: "Pontos Acumulados", value: "1.250", color: "purple" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resumo da Conta</h1>
          <p className="text-gray-600">Bem-vindo de volta, {userInfo.name}!</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg transition-colors">
          <LucideEdit className="w-4 h-4" />
          Editar Perfil
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 ">

            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Informações Pessoais</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LuUser className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Nome Completo</div>
                  <div className="font-medium text-gray-800">{userInfo.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuMail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">E-mail</div>
                  <div className="font-medium text-gray-800">{userInfo.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Telefone</div>
                  <div className="font-medium text-gray-800">{userInfo.phone}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LuCalendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Data de Nascimento</div>
                  <div className="font-medium text-gray-800">{userInfo.birthDate}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuMapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Endereço Principal</div>
                  <div className="font-medium text-gray-800">{userInfo.address}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuUser className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Membro Desde</div>
                  <div className="font-medium text-gray-800">{userInfo.memberSince}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Últimas Atividades</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <LuPackage className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">Pedido #12345 entregue</div>
                <div className="text-sm text-gray-500">Há 2 dias</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <LuHeart className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">Produto adicionado à lista de desejos</div>
                <div className="text-sm text-gray-500">Há 5 dias</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <LuMapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">Novo endereço cadastrado</div>
                <div className="text-sm text-gray-500">Há 1 semana</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
