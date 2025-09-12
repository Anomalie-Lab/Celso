"use client"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuPackage, LuTruck, LuEye, LuDownload, LuCheck, LuClock, LuLoader } from "react-icons/lu";
import { Account } from "@/api/account.api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type OrderStatus = "PENDING" | "APPROVED" | "SHIPPED" | "COMPLETED" | "CANCELLED";

interface Order {
  id: number;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  invoices: Array<{
    id: number;
    total_amount: number;
    items: Array<{
      id: number;
      quantity: number;
      price: number;
      product: {
        id: number;
        title: string;
      };
    }>;
  }>;
  histories: Array<{
    id: number;
    status: OrderStatus;
    created_at: string;
  }>;
}

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["user-orders"],
    queryFn: Account.getUserOrders,
  });

  // Dados mockados para teste do status SHIPPED
  const mockShippedOrder: Order = {
    id: 9999,
    total_amount: 250.00,
    status: "SHIPPED",
    created_at: "2024-01-15T10:30:00Z",
    invoices: [
      {
        id: 1,
        total_amount: 250.00,
        items: [
          {
            id: 1,
            quantity: 2,
            price: 125.00,
            product: {
              id: 101,
              title: "Kit de Primeiros Socorros Completo"
            }
          }
        ]
      }
    ],
    histories: [
      {
        id: 1,
        status: "PENDING",
        created_at: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        status: "APPROVED",
        created_at: "2024-01-15T14:20:00Z"
      },
      {
        id: 3,
        status: "SHIPPED",
        created_at: "2024-01-16T09:15:00Z"
      }
    ]
  };

  const displayOrders = orders ? [...orders, mockShippedOrder] : [mockShippedOrder];

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Processando",
          color: "bg-yellow-100 text-yellow-800",
          iconColor: "text-yellow-600",
          icon: LuClock,
        };
      case "APPROVED":
        return {
          label: "Aprovado",
          color: "bg-blue-100 text-blue-800",
          iconColor: "text-blue-600",
          icon: LuCheck,
        };
      case "SHIPPED":
        return {
          label: "Em Transporte",
          color: "bg-purple-100 text-purple-800",
          iconColor: "text-purple-600",
          icon: LuTruck,
        };
      case "COMPLETED":
        return {
          label: "Entregue",
          color: "bg-green-100 text-green-800",
          iconColor: "text-green-600",
          icon: LuCheck,
        };
      case "CANCELLED":
        return {
          label: "Cancelado",
          color: "bg-red-100 text-red-800",
          iconColor: "text-red-600",
          icon: LuPackage,
        };
      default:
        return {
          label: "Desconhecido",
          color: "bg-gray-100 text-gray-800",
          iconColor: "text-gray-600",
          icon: LuPackage,
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} - ${hour}:${minute}`;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const filteredOrders = displayOrders?.filter((order: Order) => {
    if (selectedStatus === "ALL") return true;
    return order.status === selectedStatus;
  }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const statusFilters = [
    { value: "ALL" as const, label: "Todos" },
    { value: "PENDING" as const, label: "Processando" },
    { value: "APPROVED" as const, label: "Aprovado" },
    { value: "SHIPPED" as const, label: "Em Transporte" },
    { value: "COMPLETED" as const, label: "Entregues" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LuLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Erro ao carregar pedidos</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center md:text-left w-full">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Meus Pedidos</h1>
          <p className="text-gray-600 text-sm md:text-base">Acompanhe o histórico de suas compras</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {statusFilters.map((filter) => {
          const isActive = selectedStatus === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => {
                setSelectedStatus(filter.value);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {paginatedOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <LuPackage className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-500">
            {selectedStatus === "ALL" 
              ? "Você ainda não fez nenhum pedido" 
              : `Nenhum pedido com status "${getStatusInfo(selectedStatus as OrderStatus).label}"`
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedOrders.map((order: Order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            const totalItems = order.invoices.reduce((acc, invoice) => 
              acc + invoice.items.reduce((sum, item) => sum + item.quantity, 0), 0
            );

            return (
              <div key={order.id} className="bg-white rounded-lg border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col gap-2 md:flex-row items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <LuPackage className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold text-gray-800">Pedido #{order.id}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatDate(order.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                      <StatusIcon className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Total</div>
                      <div className="font-semibold text-gray-800">{formatCurrency(order.total_amount)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Itens</div>
                      <div className="font-semibold text-gray-800">{totalItems} produto(s)</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-semibold text-gray-800">{statusInfo.label}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border border-gray-300 p-5 text-gray-700 cursor-pointer"
                        >
                          <LuEye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] p-12">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Data do Pedido</div>
                              <div className="font-medium">{formatDate(order.created_at)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Status</div>
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                                <statusInfo.icon className="w-3 h-3" />
                                {statusInfo.label}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Total</div>
                              <div className="font-medium">{formatCurrency(order.total_amount)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Itens</div>
                              <div className="font-medium">{totalItems} produto(s)</div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-500 mb-2">Produtos</div>
                            <div className="space-y-2">
                              {order.invoices.map((invoice) =>
                                invoice.items.map((item) => (
                                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <div className="font-medium text-sm">{item.product.title}</div>
                                      <div className="text-xs text-gray-500">
                                        Quantidade: {item.quantity} x {formatCurrency(item.price)}
                                      </div>
                                    </div>
                                    <div className="font-medium">
                                      {formatCurrency(item.quantity * item.price)}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="text-sm text-gray-500 mb-2">Histórico</div>
                            <div className="space-y-2">
                              {order.histories.map((history) => {
                                const historyStatusInfo = getStatusInfo(history.status);
                                const HistoryIcon = historyStatusInfo.icon;
                                return (
                                  <div key={history.id} className="flex items-center gap-3 p-2">
                                    <HistoryIcon className={`w-4 h-4 ${historyStatusInfo.iconColor}`} />
                                    <div className="flex-1">
                                      <div className="text-sm font-medium">{historyStatusInfo.label}</div>
                                      <div className="text-xs text-gray-500">{formatDateTime(history.created_at)}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm"   className="border border-gray-300 p-5 text-gray-700 cursor-pointer">
                      <LuDownload className="w-4 h-4 mr-2" />
                      Nota Fiscal
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
