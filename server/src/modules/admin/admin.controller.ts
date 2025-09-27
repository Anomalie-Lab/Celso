import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res, UsePipes, ValidationPipe, Query} from '@nestjs/common';
import {AdminService} from './admin.service';
import {CreateProductDto, UpdateProductDto} from 'src/dtos/products.dto';
import {ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery} from '@nestjs/swagger';
import {isAdmin} from 'src/decorators/admin.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  @isAdmin()
  @ApiOperation({summary: 'Get admin dashboard statistics'})
  @ApiResponse({status: 200, description: 'Dashboard stats retrieved successfully'})
  async getDashboardStats(@Res() res) {
    const data = await this.adminService.getDashboardStats();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('activity')
  @isAdmin()
  @ApiOperation({summary: 'Get recent admin activity'})
  @ApiResponse({status: 200, description: 'Recent activity retrieved successfully'})
  async getRecentActivity(@Res() res) {
    const data = await this.adminService.getRecentActivity();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('top-products')
  @isAdmin()
  @ApiOperation({summary: 'Get top selling products (current month)'})
  @ApiResponse({status: 200, description: 'Top products retrieved successfully'})
  async getTopProducts(@Res() res) {
    const data = await this.adminService.getTopProducts();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('orders')
  @isAdmin()
  @ApiOperation({summary: 'Get orders list'})
  @ApiResponse({status: 200, description: 'Orders retrieved successfully'})
  async getOrders(@Res() res) {
    const data = await this.adminService.getOrders();
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('orders/:id')
  @isAdmin()
  @ApiOperation({summary: 'Get order by ID'})
  @ApiParam({name: 'id', description: 'Order ID'})
  @ApiResponse({status: 200, description: 'Order retrieved successfully'})
  @ApiResponse({status: 404, description: 'Order not found'})
  async getOrderById(@Param('id') id: string, @Res() res) {
    const order = await this.adminService.getOrderById(+id);
    return res.status(HttpStatus.OK).json(order);
  }

  @Post('orders')
  @isAdmin()
  @ApiOperation({summary: 'Create a new order'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number' },
        invoice: { type: 'object' },
        items: { type: 'array' }
      }
    }
  })
  @ApiResponse({status: 201, description: 'Order created successfully'})
  async createOrder(@Body() orderData: any, @Res() res) {
    const order = await this.adminService.createOrder(orderData.userId, orderData);
    return res.status(HttpStatus.CREATED).json(order);
  }

  @Patch('orders/:id/status')
  @isAdmin()
  @ApiOperation({summary: 'Update order status'})
  @ApiParam({name: 'id', description: 'Order ID'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        statusText: { type: 'string' },
        deliveryCompany: { type: 'string' },
        estimatedDelivery: { type: 'string' },
        trackingCode: { type: 'string' },
        pickupInfo: { type: 'string' },
        nextSteps: { type: 'string' }
      }
    }
  })
  @ApiResponse({status: 200, description: 'Order status updated successfully'})
  @ApiResponse({status: 404, description: 'Order not found'})
  async updateOrderStatus(@Param('id') id: string, @Body() updateData: any, @Res() res) {
    const { status, statusText, ...additionalData } = updateData;
    const order = await this.adminService.updateOrderStatus(+id, status, statusText, additionalData);
    return res.status(HttpStatus.OK).json(order);
  }

  @Get('users')
  @isAdmin()
  @ApiOperation({summary: 'Get all users (Admin)'})
  @ApiResponse({status: 200, description: 'Users retrieved successfully'})
  async getAllUsers(@Res() res) {
    const users = await this.adminService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('users/search')
  @isAdmin()
  @ApiOperation({summary: 'Search users (Admin)'})
  @ApiQuery({name: 'q', description: 'Search query'})
  @ApiResponse({status: 200, description: 'Users found successfully'})
  async searchUsers(@Query('q') query: string, @Res() res) {
    const users = await this.adminService.searchUsers(query);
    return res.status(HttpStatus.OK).json(users);
  }

  @Get('users/:id')
  @isAdmin()
  @ApiOperation({summary: 'Get user by ID (Admin)'})
  @ApiParam({name: 'id', description: 'User ID'})
  @ApiResponse({status: 200, description: 'User retrieved successfully'})
  @ApiResponse({status: 404, description: 'User not found'})
  async getUserById(@Param('id') id: string, @Res() res) {
    const user = await this.adminService.getUserById(+id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Get('products')
  @isAdmin()
  @ApiOperation({summary: 'Get all products (Admin)'})
  @ApiResponse({status: 200, description: 'Products retrieved successfully'})
  async getAllProducts(@Res() res) {
    const products = await this.adminService.getAllProducts();
    return res.status(HttpStatus.OK).json(products);
  }

  @Post('products')
  @isAdmin()
  @ApiOperation({summary: 'Create a new product'})
  @ApiBody({type: CreateProductDto})
  @ApiResponse({status: 201, description: 'Product created successfully'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async createProduct(@Body() createProductDto: CreateProductDto, @Res() res) {
    const product = await this.adminService.createProduct(createProductDto);
    return res.status(HttpStatus.CREATED).json(product);
  }

  @Put('products/:id')
  @isAdmin()
  @ApiOperation({summary: 'Update product'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiBody({type: UpdateProductDto})
  @ApiResponse({status: 200, description: 'Product updated successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Res() res) {
    const product = await this.adminService.updateProduct(+id, updateProductDto);
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('products/:id')
  @isAdmin()
  @ApiOperation({summary: 'Delete product'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiResponse({status: 200, description: 'Product deleted successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  async deleteProduct(@Param('id') id: string, @Res() res) {
    await this.adminService.deleteProduct(+id);
    return res.status(HttpStatus.OK).json({message: 'Product deleted successfully'});
  }

  @Patch('products/:id/stock')
  @isAdmin()
  @ApiOperation({summary: 'Update product stock'})
  @ApiParam({name: 'id', description: 'Product ID'})
  @ApiBody({schema: {properties: {stock: {type: 'number'}}}})
  @ApiResponse({status: 200, description: 'Stock updated successfully'})
  @ApiResponse({status: 404, description: 'Product not found'})
  async updateProductStock(@Param('id') id: string, @Body('stock') stock: number, @Res() res) {
    const product = await this.adminService.updateProductStock(+id, stock);
    return res.status(HttpStatus.OK).json(product);
  }
}
