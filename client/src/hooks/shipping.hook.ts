import { useState } from "react";

interface ShippingInfo {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const useShipping = () => {
  const [cep, setCep] = useState("");
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setShippingInfo(data);
        setCep(cepValue);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepChange = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue.length <= 8) {
      setCep(numericValue);
      if (numericValue.length === 8) {
        calculateShipping(numericValue);
      }
    }
  };

  const getShippingCost = () => {
    return 9.99; // Valor fixo do frete
  };

  return {
    cep,
    shippingInfo,
    isLoading,
    calculateShipping,
    handleCepChange,
    getShippingCost,
  };
};
