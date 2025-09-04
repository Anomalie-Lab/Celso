import { useEffect } from 'react';
import { useAnalytics } from './analytics.hook';

interface UseProductViewProps {
  productId: number;
  enabled?: boolean;
  source?: string;
}

export const useProductView = ({ 
  productId, 
  enabled = true, 
  source 
}: UseProductViewProps) => {
  const { trackProductView } = useAnalytics();

  useEffect(() => {
    if (enabled && productId && typeof window !== 'undefined') {
      // Aguardar um pouco para garantir que o usuário realmente está vendo o produto
      const timer = setTimeout(() => {
        trackProductView(productId, source || window.location.pathname);
      }, 2000); // 2 segundos de visualização

      return () => clearTimeout(timer);
    }
  }, [productId, enabled, source, trackProductView]);
};
