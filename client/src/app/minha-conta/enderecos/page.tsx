"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Account } from "@/api/account.api";
import { Trash2 } from "lucide-react";
import AddressForm from "@/components/account/addressForm";
import { Button } from "@/components/ui/button";
import { AddressesSkeleton } from "@/components/ui/addressesSkeleton";
import { toast } from "sonner";

interface Address {
  id: number;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  primary: boolean;
}

export default function AddressesPage() {
  const queryClient = useQueryClient();
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);

  const { data: addresses, isLoading } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: Account.getAddresses,
  });

  const handleDeleteAddress = async (id: number) => {
    try {
      setDeletingAddressId(id);
      await Account.deleteAddress(id);
      toast.success("Endereço excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir endereço");
    } finally {
      setDeletingAddressId(null);
    }
  };

  if (isLoading) {
    return <AddressesSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center md:text-left w-full">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Meus Endereços</h1>
          <p className="text-gray-600 text-sm md:text-base">Gerencie seus endereços de entrega</p>
        </div>
      </div>

      <div className="grid gap-4">
        {addresses && addresses.map((address: Address) => (
          <div key={address.id} className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800">
                    {address.street}, {address.number}
                  </h3>
                  {address.primary && (
                    <span className="px-2 py-1 text-xs bg-primary text-white rounded-full">
                      Principal
                    </span>
                  )}
                </div>
                {address.complement && (
                  <p className="text-gray-600 text-sm mb-1">{address.complement}</p>
                )}
                <p className="text-gray-600 text-sm">
                  {address.neighborhood}, {address.city} - {address.state}
                </p>
                <p className="text-gray-600 text-sm">{address.zip_code}</p>
              </div>
              <div className="flex items-center gap-2">
                <AddressForm mode="edit" address={address} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteAddress(address.id)}
                  disabled={deletingAddressId === address.id}
                  className="text-red-600 hover:text-red-700 cursor-pointer"
                >
                  {deletingAddressId === address.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!addresses || addresses.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">Nenhum endereço cadastrado</h3>
          <p className="text-gray-500 mb-6">
            Adicione um endereço para facilitar suas compras
          </p>
          <div className="flex justify-center mt-4">
            <AddressForm mode="create" />
          </div>
        </div>
      )}
    </div>
  );
}
