declare namespace Product {
  interface ProductSimple {
    id: number;
    title: string;
    summary: string;
    description: string;
    brand: string;
    price: number;
    last_price: number;
    installments: number;
    blur?: string | null;
    details?: any | null;
    flags?: any | null;
    categories?: any | null;
    sizes?: any | null;
    stock: number;
    views: number;
    added_to_cart: number;
    added_to_wishlist: number;
    updated_at: Date;
    created_at: Date;
  }

  interface ProductComment {
    id: number;
    message: string;
    rating: number;
    attachments?: any | null;
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

  interface CartItem {
    id: number;
    quantity: number;
    size: string;
    color: string;
    cart_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface WishlistItem {
    id: number;
    wishlist_id: number;
    product_id: number;
    created_at: Date;
  }

  interface InvoiceItem {
    id: number;
    invoice_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at: Date;
  }

  interface ProductWithRelations extends ProductSimple {
    comments: ProductComment[];
    cart_items: CartItem[];
    wishlist_items: WishlistItem[];
    invoices: InvoiceItem[];
  }

  interface CreateProductData {
    title: string;
    summary: string;
    description: string;
    brand: string;
    price: number;
    last_price: number;
    installments?: number;
    blur?: string;
    details?: any;
    flags?: any;
    categories?: any;
    sizes?: any;
    stock?: number;
  }

  interface UpdateProductData {
    title?: string;
    summary?: string;
    description?: string;
    brand?: string;
    price?: number;
    last_price?: number;
    installments?: number;
    blur?: string;
    details?: any;
    flags?: any;
    categories?: any;
    sizes?: any;
    stock?: number;
  }

  interface ProductFilters {
    search?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    categories?: string[];
    inStock?: boolean;
  }

  interface ProductsPaginatedResponse {
    products: ProductSimple[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
