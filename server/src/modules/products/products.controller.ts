import { Controller, Get, Param, Query, HttpStatus, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import type { Response } from 'express';
import { isPublic } from 'src/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @isPublic()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'All products retrieved successfully',
  })
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('discounted')
  @isPublic()
  @ApiOperation({ summary: 'Get products with discount' })
  @ApiResponse({
    status: 200,
    description: 'Discounted products retrieved successfully',
  })
  async findDiscountedProducts(@Res() res: Response) {
    const products = await this.productsService.findDiscountedProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('best-sellers')
  @isPublic()
  @ApiOperation({ summary: 'Get best selling products' })
  @ApiResponse({
    status: 200,
    description: 'Best sellers retrieved successfully',
  })
  async findBestSellers(@Res() res: Response) {
    const products = await this.productsService.findBestSellers();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('search')
  @isPublic()
  @ApiOperation({ summary: 'Search products' })
  @ApiQuery({ name: 'q', description: 'Search query', required: false })
  @ApiQuery({ name: 'category', description: 'Category filter', required: false })
  @ApiQuery({ name: 'brand', description: 'Brand filter', required: false })
  @ApiQuery({ name: 'minPrice', description: 'Minimum price', required: false })
  @ApiQuery({ name: 'maxPrice', description: 'Maximum price', required: false })
  @ApiQuery({ name: 'sort', description: 'Sort order', required: false })
  @ApiQuery({ name: 'page', description: 'Page number', required: false })
  @ApiQuery({ name: 'limit', description: 'Items per page', required: false })
  @ApiResponse({ status: 200, description: 'Products found successfully' })
  async search(
    @Res() res: Response,
    @Query('q') query?: string,
    @Query('category') category?: string,
    @Query('brand') brand?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sort') sort?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const searchParams = {
      query,
      category,
      brand,
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sort,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 12,
    };
    
    const result = await this.productsService.searchProducts(searchParams);
    return res.status(HttpStatus.OK).json(result);
  }

  @Get('test-categories')
  @isPublic()
  @ApiOperation({ summary: 'Test categories endpoint' })
  @ApiResponse({ status: 200, description: 'Categories test response' })
  async testCategories(@Res() res: Response) {
    try {
      const categories = await this.productsService.getCategories();
      return res.status(HttpStatus.OK).json({
        message: 'Categories endpoint funcionando',
        totalCategories: categories.length,
        categories: categories
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Erro ao buscar categorias',
        error: error.message
      });
    }
  }

  @Get('categories')
  @isPublic()
  @ApiOperation({ summary: 'Get all product categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  async getCategories(@Res() res: Response) {
    const categories = await this.productsService.getCategories();
    return res.status(HttpStatus.OK).json(categories);
  }

  @Get('brands')
  @isPublic()
  @ApiOperation({ summary: 'Get all product brands' })
  @ApiResponse({ status: 200, description: 'Brands retrieved successfully' })
  async getBrands(@Res() res: Response) {
    const brands = await this.productsService.getBrands();
    return res.status(HttpStatus.OK).json(brands);
  }

  @Get(':id')
  @isPublic()
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json(product);
  }
}
