import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../repositories/products/products.repository';

interface SearchParams {
  query?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async search(query: string) {
    return await this.productsRepository.search(query);
  }

  async searchProducts(params: SearchParams) {
    return await this.productsRepository.searchProducts(params);
  }

  async findDiscountedProducts() {
    return await this.productsRepository.findDiscountedProducts();
  }

  async findBestSellers() {
    return await this.productsRepository.findBestSellers();
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async getCategories() {
    return await this.productsRepository.getCategories();
  }

  async getBrands() {
    return await this.productsRepository.getBrands();
  }
}
