export interface Product {
  id: number;
  discount: string;
  productName: string;
  rating: number;
  reviews: number;
  description: string;
  currentPrice: string;
  originalPrice: string;
  color?: string;
  additionalInfo?: string;
  image: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface ProductsData {
  products: Product[];
  categories: Category[];
}
