"use client"

import { LuMail, LuBell, LuGift, LuTag, LuShield } from "react-icons/lu";
import { useState } from "react";
import { useNewsletter } from "@/hooks/useNewsletter";
import { useUser } from "@/hooks/user.hook";

export default function NewsletterPage() {
  const { user } = useUser();
  const {
    preferences,
    userEmail,
    loading,
    saving,
    error,
    updatePreferences,
    updatePreference,
    setPreferences,
  } = useNewsletter();

  const [hasChanges, setHasChanges] = useState(false);
  const [originalPreferences, setOriginalPreferences] = useState(preferences);

  const handlePreferenceChange = (key: string) => {
    const newValue = !preferences[key as keyof typeof preferences];
    updatePreference(key as keyof typeof preferences, newValue);
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await updatePreferences(preferences);
      setOriginalPreferences(preferences);
      setHasChanges(false);
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
    }
  };

  const handleCancel = () => {
    setPreferences(originalPreferences);
    setHasChanges(false);
  };

  const emailPreferences = [
    {
      key: "promotional",
      title: "Promoções e Ofertas",
      description: "Receba ofertas exclusivas e descontos especiais",
      icon: LuGift,
      color: "bg-red-100 text-red-600"
    },
    {
      key: "orderUpdates",
      title: "Atualizações de Pedidos",
      description: "Acompanhe o status dos seus pedidos em tempo real",
      icon: LuBell,
      color: "bg-blue-100 text-blue-600"
    },
    {
      key: "newProducts",
      title: "Novos Produtos",
      description: "Seja o primeiro a conhecer nossos lançamentos",
      icon: LuTag,
      color: "bg-green-100 text-green-600"
    },
    {
      key: "exclusiveOffers",
      title: "Ofertas Exclusivas",
      description: "Acesso antecipado a promoções especiais",
      icon: LuGift,
      color: "bg-purple-100 text-purple-600"
    },
    {
      key: "securityAlerts",
      title: "Alertas de Segurança",
      description: "Notificações importantes sobre sua conta",
      icon: LuShield,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Preferências de Newsletter</h1>
            <p className="text-gray-600">Carregando suas preferências...</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Preferências de Newsletter</h1>
          <p className="text-gray-600">Gerencie suas preferências de comunicação</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="border border-gray-100 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <LuMail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary">
              Email Principal
            </h3>
            <p className="text-black mb-2">{userEmail || user?.email || 'Carregando...'}</p>
            <p className="text-gray-400 text-sm">
              Este é o email que usamos para enviar todas as comunicações importantes sobre sua conta.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Preferências de Comunicação</h2>
          <p className="text-gray-600 text-sm mt-1">
            Escolha quais tipos de emails você gostaria de receber
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {emailPreferences.map((preference) => {
              const Icon = preference.icon;
              const isEnabled = preferences[preference.key as keyof typeof preferences];
              
              return (
                <div key={preference.key} className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${preference.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{preference.title}</h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEnabled}
                          onChange={() => handlePreferenceChange(preference.key)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">{preference.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Salvar Preferências</h3>
          <p className="text-sm text-gray-600">Suas preferências serão aplicadas imediatamente</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleCancel}
            disabled={!hasChanges || saving}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="px-6 py-2 bg-primary text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}
