import { useCallback } from 'react';
import { Analytics } from '../api/analytics.api';
import { useUser } from './user.hook';

export const useAnalytics = () => {
  const { user } = useUser();

  const trackEvent = useCallback(async (
    productId: number,
    action: 'view' | 'wishlist_add' | 'cart_add' | 'purchase' | 'search',
    source?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any
  ) => {
    try {
      await Analytics.trackEvent({
        product_id: productId,
        action,
        source: source || (typeof window !== 'undefined' ? window.location.pathname : ''),
        metadata: {
          ...metadata,
          user_authenticated: !!user,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error('Erro ao registrar evento de analytics:', error);
    }
  }, [user]);

  const trackProductView = useCallback((productId: number, source?: string) => {
    trackEvent(productId, 'view', source, {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    });
  }, [trackEvent]);

  const trackWishlistAdd = useCallback((productId: number, source?: string) => {
    trackEvent(productId, 'wishlist_add', source, {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, [trackEvent]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackCartAdd = useCallback((productId: number, source?: string, metadata?: any) => {
    trackEvent(productId, 'cart_add', source, {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      ...metadata,
    });
  }, [trackEvent]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const trackPurchase = useCallback((productId: number, source?: string, metadata?: any) => {
    trackEvent(productId, 'purchase', source, {
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      ...metadata,
    });
  }, [trackEvent]);

  const trackSearch = useCallback((productId: number, searchTerm: string, source?: string) => {
    trackEvent(productId, 'search', source, {
      search_term: searchTerm,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackProductView,
    trackWishlistAdd,
    trackCartAdd,
    trackPurchase,
    trackSearch,
  };
};
