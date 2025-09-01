import { useState } from 'react';

interface ShippingInfo {
  city: string;
  neighborhood: string;
  found: boolean;
}

export const useShipping = () => {
  const [cep, setCep] = useState('');
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);

  const calculateShipping = async (cepValue: string) => {
    if (cepValue.length !== 8) return;
    
    setIsCalculatingShipping(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setShippingInfo({
          city: data.localidade,
          neighborhood: data.bairro,
          found: true
        });
      } else {
        setShippingInfo({
          city: '',
          neighborhood: '',
          found: false
        });
      }
    } catch (error) {
      setShippingInfo({
        city: '',
        neighborhood: '',
        found: false
      });
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const handleCepChange = (value: string) => {
    const numericCep = value.replace(/\D/g, '');
    setCep(numericCep);
    
    if (numericCep.length === 8) {
      calculateShipping(numericCep);
    } else {
      setShippingInfo(null);
    }
  };

  const getShippingCost = () => {
    return shippingInfo && shippingInfo.found ? 9.99 : 0;
  };

  return {
    cep,
    shippingInfo,
    isCalculatingShipping,
    handleCepChange,
    getShippingCost,
  };
};
