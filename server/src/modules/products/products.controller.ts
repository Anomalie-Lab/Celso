import {Controller, Get, Param, Query, HttpStatus, Res} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
import {ProductsService} from './products.service';
import type {Response} from 'express';
import {isPublic} from 'src/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('discounted')
  @isPublic()
  @ApiOperation({summary: 'Get products with discount'})
  @ApiResponse({status: 200, description: 'Discounted products retrieved successfully'})
  async findDiscountedProducts(@Res() res: Response) {
    const products = await this.productsService.findDiscountedProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('best-sellers')
  @isPublic()
  @ApiOperation({summary: 'Get best selling products'})
  @ApiResponse({status: 200, description: 'Best sellers retrieved successfully'})
  async findBestSellers(@Res() res: Response) {
    const products = await this.productsService.findBestSellers();
    return res.status(HttpStatus.OK).json(products);
  }

  @Get('search')
  @isPublic()
  @ApiOperation({summary: 'Search products'})
  @ApiQuery({name: 'q', description: 'Search query'})
  @ApiResponse({status: 200, description: 'Products found successfully'})
  async search(@Query('q') query: string, @Res() res: Response) {
    const products = await this.productsService.search(query);
    return res.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  @isPublic()
  @ApiOperation({summary: 'Get product by ID'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiResponse({status: 200, description: 'Product retrieved successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);
    return res.status(HttpStatus.OK).json(product);
  }
}
