import { useState } from 'react';

export interface CheckoutFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Delivery Information
  deliveryMethod: 'delivery' | 'store';
  cep: string;
  city: string;
  address: string;
  neighborhood: string;
  state: string;
  storeLocation?: string;
  
  // Payment Information
  paymentMethod: 'card' | 'pix' | 'boleto';
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  cardName: string;
}

export interface CheckoutStep {
  id: number;
  title: string;
  completed: boolean;
}

export const useCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryMethod: 'delivery',
    cep: '',
    city: '',
    address: '',
    neighborhood: '',
    state: '',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });

  const steps: CheckoutStep[] = [
    { id: 1, title: "Informações Pessoais", completed: currentStep > 1 },
    { id: 2, title: "Entrega", completed: currentStep > 2 },
    { id: 3, title: "Pagamento", completed: currentStep > 3 },
    { id: 4, title: "Confirmação", completed: false },
  ];

  const updateFormData = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        if (formData.deliveryMethod === 'delivery') {
          return !!(formData.cep && formData.city && formData.address && formData.neighborhood && formData.state);
        } else {
          return !!formData.storeLocation;
        }
      case 3:
        if (formData.paymentMethod === 'card') {
          return !!(formData.cardNumber && formData.cardExpiry && formData.cardCvv && formData.cardName);
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  return {
    currentStep,
    formData,
    steps,
    updateFormData,
    validateStep,
    nextStep,
    prevStep,
    goToStep,
  };
};
