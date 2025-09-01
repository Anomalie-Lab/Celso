declare namespace Product {
 
 interface SimpleI {
    id: number;
    title: string;
    summary: string;
    description: string;
    brand: string;
    price: number;
    last_price: number;
    installments: number;
    blur?: string | null;
    details?: string[]  | null;
    flags?: string[] | null;
    images?: string[] | null;
    categories?: string[] | null;
    sizes?: string[] | null;
    stock: number;
    views: number;
    added_to_cart: number;
    added_to_wishlist: number;
    updated_at: Date; 
    created_at: Date; 
  }
  
   interface CommentI {
    id: number;
    message: string;
    rating: number;
    attachments?: string[] | null;
    user_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date;
    user: {
      id: number;
      fullname: string;
      avatar: string;
    };
  }
  
   interface CartItemI {
    id: number;
    quantity: number;
    size?: string;
    color?: string;
    cart_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date;
  }
  
   interface WishlistItemI {
    id: number;
    wishlist_id: number;
    product_id: number;
    created_at: Date;
  }
  
   interface InvoiceItemI {
    id: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at: Date;
  }
  
   interface ProductCompleteI extends SimpleI {
    comments: CommentI[];
    cart_items: CartItemI[];
    wishlist_items: WishlistItemI[];
    invoices: InvoiceItemI[];
  }
}