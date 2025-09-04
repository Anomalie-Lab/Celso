import { api } from "@/lib/axios.lib";

export interface AnalyticsEvent {
  product_id: number;
  action: 'view' | 'wishlist_add' | 'cart_add' | 'purchase' | 'search';
  source?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: any;
}

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const Analytics = {
  trackEvent: async (data: AnalyticsEvent): Promise<void> => {
    try {
      await api.post('/analytics/track', data);
    } catch (error) {
      throw error;
    }
  },

  getProductAnalytics: async (productId: number, days?: number): Promise<ProductAnalytics[]> => {
    const response = await api.get(`/analytics/product/${productId}`, {
      params: { days }
    });
    return response.data.data;
  },

  getAnalyticsSummary: async (days?: number): Promise<AnalyticsSummary> => {
    const response = await api.get('/analytics/summary', {
      params: { days }
    });
    return response.data.data;
  },

  getAnalyticsByDateRange: async (startDate?: string, endDate?: string, days?: number): Promise<ProductAnalytics[]> => {
    const response = await api.get('/analytics/range', {
      params: { startDate, endDate, days }
    });
    return response.data.data;
  },

  getProductConversionFunnel: async (productId: number, days?: number): Promise<ConversionFunnel> => {
    const response = await api.get(`/analytics/product/${productId}/funnel`, {
      params: { days }
    });
    return response.data.data;
  },
};
