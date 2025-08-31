import { api } from '@/lib/axios.lib';

export const Products = {
  async getAll(): Promise<Product.SimpleI[]> {
    const response = await api.get('/products');
    return response.data;
  },

  async getById(id: number): Promise<Product.ProductCompleteI> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async search(query: string): Promise<Product.SimpleI[]> {
    const response = await api.get(`/products/search?q=${query}`);
    return response.data;
  },

  async getDiscounted(): Promise<Product.SimpleI[]> {
    const response = await api.get('/products/discounted');
    return response.data;
  },

  async getBestSellers(): Promise<Product.SimpleI[]> {
    const response = await api.get('/products/best-sellers');
    return response.data;
  },
};
