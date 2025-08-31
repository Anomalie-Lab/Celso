"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Account } from "@/api/account.api";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AddressForm from "@/components/account/addressForm";
import { Button } from "@/components/ui/button";

export default function AddressesTab() {
  const queryClient = useQueryClient();

  const {
    data: addresses,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: Account.getAddresses,
  });

  const handleDeleteAddress = async (id: number) => {
    try {
      await Account.deleteAddress(id);
      toast.success("Endereço excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir endereço");
    }
  };

  const handleSuccess = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Endereços</h1>
          <p className="text-gray-600">Gerencie seus endereços de entrega</p>
        </div>
        {addresses?.length > 0 && (
          <AddressForm mode="create" onSuccess={handleSuccess}>
            <Button className="flex items-center gap-2">Adicionar Endereço</Button>
          </AddressForm>
        )}
      </div>

      {addresses && addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses
            .sort((a: any, b: any) => (a.primary ? -1 : b.primary ? 1 : 0))
            .map((address: any) => (
              <div key={address.id} className="bg-white p-6 rounded-lg border border-gray-100 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800">
                      {address.street}, {address.number}
                    </h3>
                    {address.primary && <span className="px-2 py-1 text-xs bg-primary text-white rounded-full absolute bottom-5 right-5">Padrão</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <AddressForm mode="edit" address={address} onSuccess={handleSuccess}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </AddressForm>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteAddress(address.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  {address.complement && <p>{address.complement}</p>}
                  <p>{address.neighborhood}</p>
                  <p>
                    {address.city} - {address.state}
                  </p>
                  <p>{address.zip_code}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum endereço cadastrado</h3>
          <p className="text-gray-500 mb-4">Adicione seu primeiro endereço para facilitar suas compras</p>
          <AddressForm mode="create" onSuccess={handleSuccess}>
            <Button>Adicionar Primeiro Endereço</Button>
          </AddressForm>
        </div>
      )}
    </div>
  );
}
