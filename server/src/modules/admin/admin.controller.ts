import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res, UsePipes, ValidationPipe, Query} from '@nestjs/common';
import {AdminService} from './admin.service';
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
}
