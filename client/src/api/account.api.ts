import { api } from '@/lib/axios.lib';

interface UpdateUserData {
  fullname?: string;
  username?: string;
  birthdate?: string;
  gender?: string;
  national_id?: string;
  country_id?: number;
}

interface AddressData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
  primary: boolean;
}

interface NewsletterPreferences {
  promotional: boolean;
  orderUpdates: boolean;
  newProducts: boolean;
  exclusiveOffers: boolean;
  securityAlerts: boolean;
}

export const Account = {
  async getUserStats() {
    const response = await api.get('/account/stats');
    return response.data;
  },

  async getUserActivities() {
    const response = await api.get('/account/activities');
    return response.data;
  },

  async getUserOrders() {
    const response = await api.get('/account/orders');
    return response.data;
  },

  async updateUser(data: UpdateUserData) {
    const response = await api.patch('/account/edit', data);
    return response.data;
  },

  async getAddresses() {
    const response = await api.get('/account/address');
    return response.data;
  },

  async createAddress(data: AddressData) {
    const response = await api.post('/account/address', data);
    return response.data;
  },

  async updateAddress(id: number, data: AddressData) {
    const response = await api.put(`/account/address/${id}`, data);
    return response.data;
  },

  async deleteAddress(id: number) {
    const response = await api.delete(`/account/address/${id}`);
    return response.data;
  },

  // Newsletter methods
  async getNewsletterPreferences() {
    const response = await api.get('/account/newsletter-preferences');
    return response.data;
  },

  async updateNewsletterPreferences(data: NewsletterPreferences) {
    const response = await api.patch('/account/newsletter-preferences', {
      newsletter_promotional: data.promotional,
      newsletter_order_updates: data.orderUpdates,
      newsletter_new_products: data.newProducts,
      newsletter_exclusive_offers: data.exclusiveOffers,
      newsletter_security_alerts: data.securityAlerts,
    });
    return response.data;
  },
};
