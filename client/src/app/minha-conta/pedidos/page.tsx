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

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return {
          label: "Processando",
          color: "bg-yellow-100 text-yellow-800",
          icon: LuClock,
        };
      case "APPROVED":
        return {
          label: "Aprovado",
          color: "bg-blue-100 text-blue-800",
          icon: LuCheck,
        };
      case "SHIPPED":
        return {
          label: "Em Transporte",
          color: "bg-purple-100 text-purple-800",
          icon: LuTruck,
        };
      case "COMPLETED":
        return {
          label: "Entregue",
          color: "bg-green-100 text-green-800",
          icon: LuCheck,
        };
      case "CANCELLED":
        return {
          label: "Cancelado",
          color: "bg-red-100 text-red-800",
          icon: LuPackage,
        };
      default:
        return {
          label: "Desconhecido",
          color: "bg-gray-100 text-gray-800",
          icon: LuPackage,
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const filteredOrders = orders?.filter((order: Order) => {
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
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Pedidos</h1>
          <p className="text-gray-600">Acompanhe o histórico de suas compras</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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
                  <div className="flex items-center justify-between mb-4">
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
                        >
                          <LuEye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Detalhes do Pedido #{order.id}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Data do Pedido</div>
                              <div className="font-medium">{formatDate(order.created_at)}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Status</div>
                              <div className="font-medium">{statusInfo.label}</div>
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
                                      <div className="font-medium">{item.product.title}</div>
                                      <div className="text-sm text-gray-500">
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
                                    <HistoryIcon className="w-4 h-4 text-gray-400" />
                                    <div className="flex-1">
                                      <div className="text-sm font-medium">{historyStatusInfo.label}</div>
                                      <div className="text-xs text-gray-500">{formatDate(history.created_at)}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm">
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
