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
  size?: string;
  color?: string;
  cart_id: number;
  product_id: number;
  product: {
    id: number;
    title: string;
    price: number;
    last_price: number;
    images: string[];
  };
  created_at: string;
  updated_at: string;
}

export interface Cart {
  id: number;
  user_id: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export const Cart = {
  getCart: async (): Promise<Cart> => {
    const response = await api.get("/account/cart");
    return response.data;
  },

  addToCart: async (data: AddToCartData): Promise<Cart> => {
    const response = await api.post("/account/cart", data);
    return response.data;
  },

  updateCartItem: async (itemId: number, data: UpdateCartItemData): Promise<Cart> => {
    const response = await api.put(`/account/cart/${itemId}`, data);
    return response.data;
  },

  removeFromCart: async (itemId: number): Promise<void> => {
    await api.delete(`/account/cart/${itemId}`);
  },

  clearCart: async (): Promise<void> => {
    await api.delete("/account/cart");
  },
};
