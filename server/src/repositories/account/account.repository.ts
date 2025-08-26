import {Injectable} from '@nestjs/common';
import {PrismaService} from '../../services/prisma.service';
import {CreateUpdateAddressDto, UpdateUserDto} from 'src/dtos/account.dto';

@Injectable()
export class AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(data: UpdateUserDto, id: number) {
    return await this.prisma.user.update({data, where: {id}});
  }

  async getAddress({ids, user_id}: {ids?: number[]; user_id: number}) {
    return await this.prisma.address.findMany({where: {id: {in: ids ?? []}, user_id}, orderBy: {created_at: 'desc'}});
  }

  async createAddress(data: {user_id: number; dto: CreateUpdateAddressDto}) {
    return await this.prisma.address.create({data: {...data.dto, user_id: data.user_id}});
  }

  async updateAddress(data: {user_id: number; id: number; dto: CreateUpdateAddressDto}) {
    return await this.prisma.address.update({where: {id: data.id}, data: {...data.dto, user_id: data.user_id}});
  }

  async deleteAddress(data: {user_id: number; id: number}) {
    return await this.prisma.address.delete({where: {id: data.id}});
  }

  async findAll({ids}: {ids?: number[]}) {
    return await this.prisma.user.findMany({where: {id: {in: ids ?? []}}});
  }
}
