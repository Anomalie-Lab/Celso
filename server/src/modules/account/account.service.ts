import { Injectable } from "@nestjs/common";
import { Response as ExpressResponse } from "express";
import { AccountRepository } from "../../repositories/account/account.repository";
import { LoginUser } from "../../services/cookies.service";
import { CreateUpdateAddressDto, UpdateUserDto } from "../../dtos/account.dto";
import { HandleErrorsUserConflict } from "src/utils/handle-errors-database.util";

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
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
    return await this.accountRepository.getAddress({ user_id });
  }

  async createAddress(user_id: number, dto: CreateUpdateAddressDto) {
    return await this.accountRepository.createAddress({ user_id, dto });
  }
  
  async updateAddress(user_id: number, id: number, dto: CreateUpdateAddressDto) {
    return await this.accountRepository.updateAddress({ user_id, id, dto });
  }

  async deleteAddress(user_id: number, id: number) {
    return await this.accountRepository.deleteAddress({ user_id, id });
  } 
}
