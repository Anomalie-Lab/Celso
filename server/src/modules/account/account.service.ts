import {Injectable, NotFoundException} from '@nestjs/common';
import {Response as ExpressResponse} from 'express';
import {AccountRepository} from '../../repositories/account/account.repository';
import {LoginUser} from '../../services/cookies.service';
import {CreateUpdateAddressDto, UpdateUserDto} from '../../dtos/account.dto';
import {HandleErrorsUserConflict} from 'src/utils/handle-errors-database.util';
import {PrismaService} from '../../services/prisma.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly prisma: PrismaService
  ) {}

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

  async getOrderById(id: number) {
    const o = await this.prisma.transaction.findUnique({
      where: {id},
      include: {
        user: {select: {id: true, fullname: true, email: true}},
        invoices: {include: {items: {include: {product: true}}}},
        histories: {orderBy: {created_at: 'asc'}},
      },
    });
    if (!o) throw new NotFoundException('Order not found');

    return {
      id: o.id,
      user: o.user,
      invoices: o.invoices,
      histories: o.histories,
      total_amount: Number(o.invoices[0]?.total_amount ?? 0),
      status: o.histories[o.histories.length - 1]?.status ?? 'PENDING',
      payment_method: 'PIX',
      created_at: o.created_at,
    };
  }
}
