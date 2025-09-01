import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../repositories/products/products.repository';

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

  async findDiscountedProducts() {
    return await this.productsRepository.findDiscountedProducts();
  }

  async findBestSellers() {
    return await this.productsRepository.findBestSellers();
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }
}
