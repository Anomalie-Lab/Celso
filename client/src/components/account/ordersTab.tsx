"use client"

import { LucideCheckCircle } from "lucide-react";
import { LuPackage, LuTruck, LuClock, LuEye, LuDownload } from "react-icons/lu";

export default function OrdersTab() {
  const orders = [
    {
      id: "12345",
      date: "15/12/2023",
      status: "Entregue",
      statusColor: "green",
      total: "R$ 156,80",
      items: 3,
      tracking: "BR123456789BR"
    },
    {
      id: "12344",
      date: "10/12/2023",
      status: "Em Transporte",
      statusColor: "blue",
      total: "R$ 89,90",
      items: 2,
      tracking: "BR987654321BR"
    },
    {
      id: "12343",
      date: "05/12/2023",
      status: "Processando",
      statusColor: "yellow",
      total: "R$ 234,50",
      items: 4,
      tracking: null
    },
    {
      id: "12342",
      date: "01/12/2023",
      status: "Entregue",
      statusColor: "green",
      total: "R$ 67,80",
      items: 1,
      tracking: "BR456789123BR"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregue":
        return <LucideCheckCircle className="w-5 h-5 text-green-600" />;
      case "Em Transporte":
        return <LuTruck className="w-5 h-5 text-blue-600" />;
      case "Processando":
        return <LuClock className="w-5 h-5 text-yellow-600" />;
      default:
        return <LuPackage className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Pedidos</h1>
          <p className="text-gray-600">Acompanhe o histórico de suas compras</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">
          Todos
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
          Processando
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
          Em Transporte
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
          Entregues
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg border border-gray-100">
            <div className="p-6 px-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <LuPackage className="w-5 h-5 text-gray-400" />
                    <span className="font-semibold text-gray-800">Pedido #{order.id}</span>
                  </div>
                  <span className="text-sm text-gray-500">{order.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.statusColor)}`}>
                    {order.status}
                  </span>
                  {getStatusIcon(order.status)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Total</div>
                  <div className="font-semibold text-gray-800">{order.total}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Itens</div>
                  <div className="font-semibold text-gray-800">{order.items} produto(s)</div>
                </div>
                {order.tracking && (
                  <div>
                    <div className="text-sm text-gray-500">Rastreamento</div>
                    <div className="font-semibold text-gray-800">{order.tracking}</div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg">
                  <LuEye className="w-4 h-4" />
                  Ver Detalhes
                </button>
                {order.tracking && (
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <LuTruck className="w-4 h-4" />
                    Rastrear
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <LuDownload className="w-4 h-4" />
                  Nota Fiscal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Anterior
        </button>
        <button className="px-3 py-2 bg-primary text-white rounded-lg">1</button>
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">2</button>
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">3</button>
        <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Próxima
        </button>
      </div>
    </div>
  );
}
