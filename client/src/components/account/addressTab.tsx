"use client"

import { LuMapPin,LuTrash2, LuPlus, LuBuilding } from "react-icons/lu";
import { useState } from "react";
import { LucideEdit, LucideHome } from "lucide-react";

export default function AddressTab() {
  const [showAddForm, setShowAddForm] = useState(false);

  const addresses = [
    {
      id: 1,
      type: "Casa",
      name: "João Silva",
      street: "Rua das Flores, 123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
      isDefault: true
    },
    {
      id: 2,
      type: "Trabalho",
      name: "João Silva",
      street: "Av. Paulista, 1000",
      complement: "Sala 1010",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
      isDefault: false
    }
  ];

  const getAddressIcon = (type: string) => {
    return type === "Casa" ? <LucideHome className="w-5 h-5 text-primary" /> : <LuBuilding className="w-5 h-5 text-primary" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Endereços</h1>
          <p className="text-gray-600">Gerencie seus endereços de entrega</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer"
        >
          <LuPlus className="w-4 h-4" />
          Adicionar Endereço
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white rounded-lg border border-gray-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                    {getAddressIcon(address.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">{address.type}</h3>
                    {address.isDefault && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Padrão
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                    <LucideEdit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors cursor-pointer">
                    <LuTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-medium text-gray-800">{address.name}</div>
                <div className="text-gray-600">
                  {address.street}
                  {address.complement && `, ${address.complement}`}
                </div>
                <div className="text-gray-600">
                  {address.neighborhood}, {address.city} - {address.state}
                </div>
                <div className="text-gray-600">CEP: {address.zipCode}</div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                {!address.isDefault && (
                  <button className="text-sm text-primary-500 hover:text-primary font-medium cursor-pointer">
                    Definir como Padrão
                  </button>
                )}
                <button className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">
                  Usar para Entrega
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Adicionar Novo Endereço</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tipo de Endereço
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Casa</option>
                    <option>Trabalho</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Endereço
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Rua, número"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Apartamento, bloco, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Bairro
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bairro"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cidade"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Estado
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>SP</option>
                    <option>RJ</option>
                    <option>MG</option>
                    <option>RS</option>
                    <option>PR</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  CEP
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00000-000"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="default" className="w-4 h-4 text-blue-600 rounded" />
                <label htmlFor="default" className="text-sm">
                  Definir como endereço padrão
                </label>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Salvar Endereço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addresses.length === 0 && (
        <div className="text-center py-12">
          <LuMapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum endereço cadastrado</h3>
          <p className="text-gray-500 mb-6">
            Adicione um endereço para facilitar suas compras
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Adicionar Primeiro Endereço
          </button>
        </div>
      )}
    </div>
  );
}
