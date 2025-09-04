import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface AnalyticsSummary {
  summary: {
    totalViews: number;
    totalWishlist: number;
    totalCart: number;
    totalPurchases: number;
    conversionRate: number;
    wishlistRate: number;
    cartRate: number;
  };
  topProducts: Array<{
    product_id: number;
    _count: { product_id: number };
    product: {
      id: number;
      title: string;
      price: number;
      images: string[];
    };
  }>;
  actionStats: Array<{
    action: string;
    _count: { action: number };
  }>;
}

export interface ProductAnalytics {
  id: number;
  product_id: number;
  action: string;
  source: string | null;
  user_agent: string | null;
  referrer: string | null;
  ip_address: string | null;
  session_id: string | null;
  user_id: number | null;
  metadata: any;
  created_at: string;
  product: {
    id: number;
    title: string;
    price: number;
  };
  user: {
    id: number;
    fullname: string;
    email: string;
  } | null;
}

export interface ConversionFunnel {
  views: number;
  wishlist: number;
  cart: number;
  purchases: number;
  viewToWishlist: number;
  viewToCart: number;
  viewToPurchase: number;
  cartToPurchase: number;
}

export function useAnalyticsSummary(days: number = 30) {
  return useQuery({
    queryKey: ['analytics-summary', days],
    queryFn: async (): Promise<AnalyticsSummary> => {
      console.log('📊 Admin: Buscando resumo de analytics', { days });
      try {
        const { data } = await api.get('/analytics/summary', {
          params: { days }
        });
        console.log('📊 Admin: Resumo recebido', data.data);
        return data.data;
      } catch (error) {
        console.error('📊 Admin: Erro ao buscar resumo', error);
        throw error;
      }
    },
    refetchInterval: 60000, // Atualizar a cada minuto
  });
}

export function useProductAnalytics(productId: number, days: number = 30) {
  return useQuery({
    queryKey: ['product-analytics', productId, days],
    queryFn: async (): Promise<ProductAnalytics[]> => {
      const { data } = await api.get(`/analytics/product/${productId}`, {
        params: { days }
      });
      return data.data;
    },
    enabled: !!productId,
    refetchInterval: 60000,
  });
}

export function useProductConversionFunnel(productId: number, days: number = 30) {
  return useQuery({
    queryKey: ['product-funnel', productId, days],
    queryFn: async (): Promise<ConversionFunnel> => {
      const { data } = await api.get(`/analytics/product/${productId}/funnel`, {
        params: { days }
      });
      return data.data;
    },
    enabled: !!productId,
    refetchInterval: 60000,
  });
}

export function useAnalyticsByDateRange(startDate?: string, endDate?: string, days?: number) {
  return useQuery({
    queryKey: ['analytics-range', startDate, endDate, days],
    queryFn: async (): Promise<ProductAnalytics[]> => {
      const { data } = await api.get('/analytics/range', {
        params: { startDate, endDate, days }
      });
      return data.data;
    },
    refetchInterval: 60000,
  });
}
