import { api } from "@/lib/axios.lib";

export interface AddToWishlistData {
  product_id: number;
}

export interface WishlistItem {
  id: number;
  wishlist_id: number;
  product_id: number;
  product: {
    id: number;
    title: string;
    price: number;
    last_price: number;
    images: string[];
    brand: string;
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
  getWishlist: async (): Promise<Wishlist> => {
    const response = await api.get("/account/wishlist");
    return response.data;
  },

  addToWishlist: async (data: AddToWishlistData): Promise<Wishlist> => {
    const response = await api.post("/account/wishlist", data);
    return response.data;
  },

  removeFromWishlist: async (itemId: number): Promise<void> => {
    await api.delete(`/account/wishlist/${itemId}`);
  },

  clearWishlist: async (): Promise<void> => {
    await api.delete("/account/wishlist");
  },
};
