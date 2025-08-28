import { api } from '@/lib/axios.lib';

export const Account = {
  async getUserStats() {
    const response = await api.get('/account/stats');
    return response.data;
  },

  async getUserActivities() {
    const response = await api.get('/account/activities');
    return response.data;
  },

  async updateUser(data: any) {
    const response = await api.patch('/account/edit', data);
    return response.data;
  },

  async getAddresses() {
    const response = await api.get('/account/address');
    return response.data;
  },

  async createAddress(data: any) {
    const response = await api.post('/account/address', data);
    return response.data;
  },

  async updateAddress(id: number, data: any) {
    const response = await api.put(`/account/address/${id}`, data);
    return response.data;
  },

  async deleteAddress(id: number) {
    const response = await api.delete(`/account/address/${id}`);
    return response.data;
  },
};
