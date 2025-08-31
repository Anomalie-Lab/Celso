"use client"

import { LuUser, LuMail, LuPhone, LuCalendar, LuMapPin, LuPackage, LuHeart } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { Account } from "@/api/account.api";
import { useUser } from "@/hooks/user.hook";
import { Loader2 } from "lucide-react";
import EditAccount from "@/components/account/editAccount";

export default function ResumeTab() {
  const { user } = useUser();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['user-stats'],
    queryFn: Account.getUserStats,
    enabled: !!user,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['user-activities'],
    queryFn: Account.getUserActivities,
    enabled: !!user,
  });

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPhone = (phone: string) => {
    return phone?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') || 'Não informado';
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `Há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `Há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Faça login para ver suas informações</p>
      </div>
    );
  }

  const statsData = [
    { label: "Pedidos Realizados", value: stats?.orders_count?.toString() || "0", color: "blue" },
    { label: "Produtos Favoritos", value: stats?.wishlist_count?.toString() || "0", color: "pink" },
    { label: "Endereços Cadastrados", value: stats?.addresses_count?.toString() || "0", color: "green" },
    { label: "Pontos Acumulados", value: stats?.points?.toLocaleString('pt-BR') || "0", color: "purple" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Resumo da Conta</h1>
          <p className="text-gray-600">Bem-vindo de volta, {user.fullname}!</p>
        </div>
        <EditAccount />
      </div>

      {statsLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100">
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

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
                  <div className="font-medium text-gray-800">{user.fullname}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuMail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">E-mail</div>
                  <div className="font-medium text-gray-800">{user.email}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuPhone className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Telefone</div>
                  <div className="font-medium text-gray-800">{formatPhone("11999999999")}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <LuCalendar className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Data de Nascimento</div>
                  <div className="font-medium text-gray-800">
                    {user.birthdate ? formatDate(user.birthdate) : 'Não informado'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuMapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Username</div>
                  <div className="font-medium text-gray-800">@{user.username}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <LuUser className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Membro Desde</div>
                  <div className="font-medium text-gray-800">{formatDate(user.created_at)}</div>
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
          {activitiesLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity: any, index: number) => {
                const getIcon = (type: string) => {
                  switch (type) {
                    case 'order':
                      return LuPackage;
                    case 'wishlist':
                      return LuHeart;
                    case 'address':
                      return LuMapPin;
                    default:
                      return LuUser;
                  }
                };
                
                const Icon = getIcon(activity.type);
                
                return (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{activity.action}</div>
                      <div className="text-sm text-gray-500">{getTimeAgo(activity.created_at)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Nenhuma atividade recente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
