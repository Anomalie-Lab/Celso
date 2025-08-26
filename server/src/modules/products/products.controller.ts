import {Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus, Res, UsePipes, ValidationPipe, Patch} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery} from '@nestjs/swagger';
import {ProductsService} from './products.service';
import {CreateProductDto, UpdateProductDto} from 'src/dtos/products.dto';
import type {Response} from 'express';
import {isPublic} from 'src/decorators/public.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @isPublic()
  @ApiOperation({summary: 'Get all products'})
  @ApiResponse({status: 200, description: 'Products retrieved successfully'})
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
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

  @Post()
  @isPublic()
  @ApiOperation({summary: 'Create a new product'})
  @ApiBody({type: CreateProductDto})
  @ApiResponse({status: 201, description: 'Product created successfully'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async create(@Body() createProductDto: CreateProductDto, @Res() res: Response) {
    const product = await this.productsService.create(createProductDto);
    return res.status(HttpStatus.CREATED).json(product);
  }

  @Put(':id')
  @isPublic()
  @ApiOperation({summary: 'Update product'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiBody({type: UpdateProductDto})
  @ApiResponse({status: 200, description: 'Product updated successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res: Response) {
    const product = await this.productsService.update(+id, updateProductDto);
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete(':id')
  @isPublic()
  @ApiOperation({summary: 'Delete product'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiResponse({status: 200, description: 'Product deleted successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.productsService.remove(+id);
    return res.status(HttpStatus.OK).json({message: 'Product deleted successfully'});
  }

  @Patch(':id/stock')
  @isPublic()
  @ApiOperation({summary: 'Update product stock'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiBody({schema: {properties: {stock: {type: 'number'}}}})
  @ApiResponse({status: 200, description: 'Stock updated successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  async updateStock(@Param('id') id: string, @Body('stock') stock: number, @Res() res: Response) {
    const product = await this.productsService.updateStock(+id, stock);
    return res.status(HttpStatus.OK).json(product);
  }
}
