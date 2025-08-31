"use client";

import { useQuery } from "@tanstack/react-query";
import { LuUser, LuMail, LuPhone, LuCalendar, LuMapPin, LuPackage, LuHeart, LuLoader } from "react-icons/lu";
import { Account } from "@/api/account.api";
import { useUser } from "@/hooks/user.hook";
import EditAccount from "@/components/account/editAccount";

interface Activity {
  type: string;
  action: string;
  created_at: string;
}

export default function MinhaConta() {
  const { user } = useUser();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: Account.getUserStats,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["user-activities"],
    queryFn: Account.getUserActivities,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Hoje";
    if (diffInDays === 1) return "Ontem";
    if (diffInDays < 7) return `${diffInDays} dias atrás`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} semanas atrás`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} meses atrás`;
    return `${Math.floor(diffInDays / 365)} anos atrás`;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-12">
        <LuLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Resumo da Conta</h2>
            <EditAccount />
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {statsLoading ? "..." : stats?.orders_count || 0}
              </div>
              <div className="text-sm text-gray-500">Pedidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {statsLoading ? "..." : stats?.wishlist_count || 0}
              </div>
              <div className="text-sm text-gray-500">Lista de Desejos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {statsLoading ? "..." : stats?.addresses_count || 0}
              </div>
              <div className="text-sm text-gray-500">Endereços</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {statsLoading ? "..." : stats?.points || 0}
              </div>
              <div className="text-sm text-gray-500">Pontos</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  <div className="font-medium text-gray-800">{formatDate(user.created_at.toString())}</div>
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
              <LuLoader className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : activities && activities.length > 0 ? (
            <div className="space-y-4">
              {activities.map((activity: Activity, index: number) => {
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
