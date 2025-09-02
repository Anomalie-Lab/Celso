import {Injectable, NotFoundException} from '@nestjs/common';
import {Response as ExpressResponse} from 'express';
import {AccountRepository} from '../../repositories/account/account.repository';
import {LoginUser} from '../../services/cookies.service';
import {CreateUpdateAddressDto, UpdateUserDto} from '../../dtos/account.dto';
import {HandleErrorsUserConflict} from 'src/utils/handle-errors-database.util';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async edit(res: ExpressResponse, dto: UpdateUserDto, id: number) {
    try {
      const user = await this.accountRepository.update(dto, id);
      LoginUser(res, user);
      return user;
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async getAddress(user_id: number) {
    return await this.accountRepository.getAddress({user_id});
  }

  async createAddress(user_id: number, dto: CreateUpdateAddressDto) {
    return await this.accountRepository.createAddress({user_id, dto});
  }

  async updateAddress(user_id: number, id: number, dto: CreateUpdateAddressDto) {
    return await this.accountRepository.updateAddress({user_id, id, dto});
  }

  async deleteAddress(user_id: number, id: number) {
    return await this.accountRepository.deleteAddress({user_id, id});
  }

  async getUserOrders(userId: number) {
    return await this.accountRepository.getUserOrders(userId);
  }

  async getUserStats(userId: number) {
    return await this.accountRepository.getUserStats(userId);
  }

  async getUserActivities(userId: number) {
    return await this.accountRepository.getUserActivities(userId);
  }

  async getOrderById(id: number) {
    const order = await this.accountRepository.getOrderById(id);
    if (!order) throw new NotFoundException('Order not found');

    return {
      id: order.id,
      user: order.user,
      invoices: order.invoices,
      histories: order.histories,
      total_amount: Number(order.invoices[0]?.total_amount ?? 0),
      status: order.histories[order.histories.length - 1]?.status ?? 'PENDING',
      payment_method: 'PIX',
      created_at: order.created_at,
    };
  }

  // Cart methods
  async getUserCart(userId: number) {
    return await this.accountRepository.getUserCart(userId);
  }

  async addToCart(userId: number, dto: any) {
    return await this.accountRepository.addToCart(userId, dto);
  }

  async updateCartItem(userId: number, itemId: number, dto: any) {
    return await this.accountRepository.updateCartItem(userId, itemId, dto);
  }

  async removeFromCart(userId: number, itemId: number) {
    return await this.accountRepository.removeFromCart(userId, itemId);
  }

  async clearCart(userId: number) {
    return await this.accountRepository.clearCart(userId);
  }

  async getUserWishlist(userId: number) {
    return await this.accountRepository.getUserWishlist(userId);
  }

  async addToWishlist(userId: number, productId: number) {
    return await this.accountRepository.addToWishlist(userId, productId);
  }

  async removeFromWishlist(userId: number, itemId: number) {
    return await this.accountRepository.removeFromWishlist(userId, itemId);
  }

  async clearWishlist(userId: number) {
    return await this.accountRepository.clearWishlist(userId);
  }
}
