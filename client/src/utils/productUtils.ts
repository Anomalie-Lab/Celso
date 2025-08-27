import productsData from "@/data/products.json";
import { Product, Category } from "@/types/productTypes"

export const getProducts = (): Product[] => {
  return productsData.products as Product[];
};

export const getCategories = (): Category[] => {
  return productsData.categories as Category[];
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return getProducts().filter((product) => product.category === categoryId);
};

export const getProductById = (id: number): Product | undefined => {
  return getProducts().find((product) => product.id === id);
};

export const getProductsWithDiscount = (): Product[] => {
  return getProducts().filter((product) => product.discount);
};

export const getProductsByRating = (minRating: number): Product[] => {
  return getProducts().filter((product) => product.rating >= minRating);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return getProducts().filter((product) => product.productName.toLowerCase().includes(lowercaseQuery) || product.description.toLowerCase().includes(lowercaseQuery) || product.category.toLowerCase().includes(lowercaseQuery));
};
