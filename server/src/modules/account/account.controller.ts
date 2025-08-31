import {CreateUpdateAddressDto, UpdateUserDto} from './../../dtos/account.dto';
import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Res, UsePipes, ValidationPipe} from '@nestjs/common';
import {AccountService} from './account.service';
import {User} from '../../decorators/user.decorator';
import {ApiBody, ApiOperation, ApiResponse, ApiTags, ApiParam} from '@nestjs/swagger';
import * as docs from 'src/docs/account.doc';
import {isPublic} from 'src/decorators/public.decorator';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('edit')
  @ApiOperation({summary: 'Update User Account', description: 'Allows users to update their account details, including full name, username, birthdate, gender, national ID, and country ID. Only the fields provided in the request will be modified.'})
  @ApiResponse({status: 200, description: 'User account updated successfully.', type: docs.UserResponseSwagger})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  @ApiResponse({status: 404, description: 'User account not found.'})
  @ApiResponse({status: 500, description: 'Internal server error.'})
  @ApiBody({type: UpdateUserDto, description: 'The request body should include the updated account information.'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async edit(@Body() dto: UpdateUserDto, @Res() res, @User() user: Account.UserI) {
    const data = await this.accountService.edit(res, dto, user.id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('address')
  @ApiOperation({summary: 'Get User Address', description: 'Allows users to get their address details.'})
  @ApiResponse({status: 200, description: 'User address retrieved successfully.', type: docs.AddressResponseSwagger})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  @ApiResponse({status: 404, description: 'User address not found.'})
  @ApiResponse({status: 500, description: 'Internal server error.'})
  async getAddress(@User() user: Account.UserI, @Res() res) {
    console.log(user.id);
    const data = await this.accountService.getAddress(user.id);
    console.log(data);
    return res.status(HttpStatus.OK).json(data);
  }

  @Post('address')
  @ApiOperation({summary: 'Create User Address', description: 'Allows users to create their address details.'})
  @ApiResponse({status: 200, description: 'User address created successfully.', type: docs.AddressResponseSwagger})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  @ApiResponse({status: 404, description: 'User address not found.'})
  @ApiResponse({status: 500, description: 'Internal server error.'})
  async createAddress(@Body() dto: CreateUpdateAddressDto, @User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.createAddress(user.id, dto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Put('address/:id')
  @ApiOperation({summary: 'Update User Address', description: 'Allows users to update their address details.'})
  @ApiResponse({status: 200, description: 'User address updated successfully.', type: docs.AddressResponseSwagger})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  @ApiResponse({status: 404, description: 'User address not found.'})
  @ApiResponse({status: 500, description: 'Internal server error.'})
  async updateAddress(@Body() dto: CreateUpdateAddressDto, @Param('id') id: number, @User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.updateAddress(user.id, id, dto);
    return res.status(HttpStatus.OK).json(data);
  }

  @Delete('address/:id')
  @ApiOperation({summary: 'Delete User Address', description: 'Allows users to delete their address details.'})
  @ApiResponse({status: 200, description: 'User address deleted successfully.', type: docs.AddressResponseSwagger})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  @ApiResponse({status: 404, description: 'User address not found.'})
  @ApiResponse({status: 500, description: 'Internal server error.'})
  async deleteAddress(@Param('id') id: number, @User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.deleteAddress(user.id, id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('orders')
  @ApiOperation({summary: 'Get User Orders', description: 'Get user orders with details including products and history'})
  @ApiResponse({status: 200, description: 'User orders retrieved successfully'})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  async getUserOrders(@User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.getUserOrders(user.id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('stats')
  @ApiOperation({summary: 'Get User Statistics', description: 'Get user account statistics including orders, wishlist, addresses count and recent activities'})
  @ApiResponse({status: 200, description: 'User statistics retrieved successfully'})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  async getUserStats(@User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.getUserStats(user.id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('activities')
  @ApiOperation({summary: 'Get User Recent Activities', description: 'Get user recent activities including orders, wishlist additions, address changes'})
  @ApiResponse({status: 200, description: 'User activities retrieved successfully'})
  @ApiResponse({status: 403, description: 'Authentication required.'})
  async getUserActivities(@User() user: Account.UserI, @Res() res) {
    const data = await this.accountService.getUserActivities(user.id);
    return res.status(HttpStatus.OK).json(data);
  }

  @Get('orders/:id')
  @isPublic()
  @ApiOperation({summary: 'Get order by ID'})
  @ApiParam({name: 'id', description: 'Order/Transaction ID'})
  @ApiResponse({status: 200, description: 'Order retrieved successfully'})
  async getOrderById(@Param('id') id: string, @Res() res) {
    const data = await this.accountService.getOrderById(+id);
    return res.status(HttpStatus.OK).json(data);
  }
}
