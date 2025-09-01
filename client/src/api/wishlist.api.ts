import { api } from "@/lib/axios.lib";

export interface AddToWishlistData {
  product_id: number;
}

export interface WishlistItem {
  id: number;
  product: {
    id: number;
    title: string;
    price: number;
    images: any;
    stock: number;
    brand: string;
    categories: any;
    flags: any;
  };
  created_at: string;
}

export interface Wishlist {
  id: number;
  user_id: number;
  items: WishlistItem[];
  created_at: string;
  updated_at: string;
}

export const Wishlist = {
  async getWishlist() {
    const response = await api.get('/account/wishlist');
    return response.data;
  },

  async addToWishlist(data: AddToWishlistData) {
    const response = await api.post('/account/wishlist', data);
    return response.data;
  },

  async removeFromWishlist(itemId: number) {
    const response = await api.delete(`/account/wishlist/${itemId}`);
    return response.data;
  },

  async clearWishlist() {
    const response = await api.delete('/account/wishlist');
    return response.data;
  },
};
