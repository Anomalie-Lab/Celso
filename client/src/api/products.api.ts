import { api } from '@/lib/axios.lib';
export interface SearchProductsParams {
  q?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface SearchProductsResponse {
  products: Product.SimpleI[];
  total: number;
  page: number;
  totalPages: number;
}
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

  async searchProducts(params: SearchProductsParams): Promise<SearchProductsResponse> {
    const searchParams = new URLSearchParams();
    
    if (params.q) searchParams.append('q', params.q);
    if (params.category) searchParams.append('category', params.category);
    if (params.brand) searchParams.append('brand', params.brand);
    if (params.minPrice) searchParams.append('minPrice', params.minPrice.toString());
    if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());

    const response = await api.get(`/products/search?${searchParams.toString()}`);
    return response.data;
  },

  async getCategories(): Promise<{ id: number; name: string; slug: string; count: number }[]> {
    const response = await api.get('/products/categories');
    return response.data;
  },

  async getBrands(): Promise<string[]> {
    const response = await api.get('/products/brands');
    return response.data;
  },
};
