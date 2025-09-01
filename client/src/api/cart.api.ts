import { api } from "@/lib/axios.lib";

export interface AddToCartData {
  product_id: number;
  quantity?: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemData {
  quantity: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  size: string;
  color: string;
  product: {
    id: number;
    title: string;
    price: number;
    images: any;
    stock: number;
  };
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export const Cart = {
  async getCart() {
    const response = await api.get('/account/cart');
    return response.data;
  },

  async addToCart(data: AddToCartData) {
    const response = await api.post('/account/cart', data);
    return response.data;
  },

  async updateCartItem(itemId: number, data: UpdateCartItemData) {
    const response = await api.put(`/account/cart/${itemId}`, data);
    return response.data;
  },

  async removeFromCart(itemId: number) {
    const response = await api.delete(`/account/cart/${itemId}`);
    return response.data;
  },

  async clearCart() {
    const response = await api.delete('/account/cart');
    return response.data;
  },
};
