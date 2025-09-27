"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { LuTruck, LuLoader, LuMapPin } from "react-icons/lu";

interface CepInputProps {
  onCepChange: (cep: string) => void;
  onShippingInfo: (info: { localidade: string; uf: string; shippingCost?: number; deliveryTime?: number } | null) => void;
  isLoading?: boolean;
  className?: string;
}

export function CepInput({ onCepChange, onShippingInfo, isLoading = false, className }: CepInputProps) {
  const [cep, setCep] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<{ localidade: string; uf: string; shippingCost?: number; deliveryTime?: number } | null>(null);

  const formatCep = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 8) {
      const formatted = numericValue.replace(/(\d{5})(\d{3})/, "$1-$2");
      return formatted;
    }
    return value;
  };

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;

    setIsCalculating(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setShippingInfo(data);
        onShippingInfo(data);
        
        // Simular cálculo de frete
        const shippingCost = Math.random() * 20 + 5; // R$ 5-25
        const deliveryTime = Math.floor(Math.random() * 5) + 3; // 3-7 dias
        
        setShippingInfo(prev => prev ? {
          ...prev,
          shippingCost,
          deliveryTime
        } : {
          localidade: data.localidade,
          uf: data.uf,
          shippingCost,
          deliveryTime
        });
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCepChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const formatted = formatCep(numericValue);
    setCep(formatted);
    onCepChange(numericValue);
    
    if (numericValue.length === 8) {
      calculateShipping(numericValue);
    }
  };

  const getShippingCost = () => {
    return shippingInfo?.shippingCost || 0;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex space-x-2">
        <Input
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => handleCepChange(e.target.value)}
          maxLength={9}
          className="flex-1"
        />
        <Button 
          variant="outline" 
          disabled={isCalculating || isLoading}
          className="px-3"
        >
          {isCalculating ? (
            <LuLoader className="w-4 h-4 animate-spin" />
          ) : (
            <LuTruck className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {shippingInfo && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
          <div className="flex items-center space-x-2 text-green-700">
            <LuMapPin className="w-4 h-4" />
            <span className="text-sm font-medium">
              {shippingInfo.localidade} - {shippingInfo.uf}
            </span>
          </div>
          <div className="text-sm text-green-600 space-y-1">
            <p>Frete: {formatPrice(getShippingCost())}</p>
            <p>Entrega em {shippingInfo.deliveryTime} dias úteis</p>
            {getShippingCost() === 0 && (
              <p className="font-medium text-green-700">Frete grátis!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
