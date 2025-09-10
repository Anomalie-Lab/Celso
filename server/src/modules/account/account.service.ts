import {Injectable, NotFoundException} from '@nestjs/common';
import {Response as ExpressResponse} from 'express';
import {AccountRepository} from '../../repositories/account/account.repository';
import {LoginUser} from '../../services/cookies.service';
import {MailerService} from '../../services/mailer.sevice';
import {CreateUpdateAddressDto, UpdateUserDto} from '../../dtos/account.dto';
import {HandleErrorsUserConflict} from 'src/utils/handle-errors-database.util';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly mailerService: MailerService,
  ) {}

  async edit(res: ExpressResponse, dto: UpdateUserDto, id: number) {
    try {
      const oldUser = await this.accountRepository.findById(id);
      const user = await this.accountRepository.update(dto, id);
      
      if (oldUser && this.hasSignificantChanges(oldUser, dto)) {
        try {
          const changesSummary = this.generateChangesSummary(oldUser, dto);
          await this.mailerService.sendAccountUpdatedEmail({
            userName: user.fullname,
            userEmail: user.email,
            changesSummary,
            loginUrl: `${process.env.FRONTEND_URL}/minha-conta`,
          });
        } catch (emailError) {
          // Não falha a operação se o email falhar
        }
      }
      
      LoginUser(res, user);
      return user;
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  private hasSignificantChanges(oldUser: any, newData: UpdateUserDto): boolean {
    const significantFields = ['fullname', 'email', 'phone', 'birthdate'];
    
    return significantFields.some(field => {
      if (newData[field] !== undefined && newData[field] !== oldUser[field]) {
        return true;
      }
      return false;
    });
  }

  private generateChangesSummary(oldUser: any, newData: UpdateUserDto): string {
    const changes: string[] = [];
    
    if (newData.fullname && newData.fullname !== oldUser.fullname) {
      changes.push(`<strong>Nome:</strong> ${oldUser.fullname} → ${newData.fullname}`);
    }
    
    if (newData.email && newData.email !== oldUser.email) {
      changes.push(`<strong>Email:</strong> ${oldUser.email} → ${newData.email}`);
    }
    
    if (newData.phone && newData.phone !== oldUser.phone) {
      changes.push(`<strong>Telefone:</strong> ${oldUser.phone || 'Não informado'} → ${newData.phone}`);
    }
    
    if (newData.birthdate && newData.birthdate !== oldUser.birthdate) {
      const oldDate = oldUser.birthdate ? new Date(oldUser.birthdate).toLocaleDateString('pt-BR') : 'Não informado';
      const newDate = new Date(newData.birthdate).toLocaleDateString('pt-BR');
      changes.push(`<strong>Data de Nascimento:</strong> ${oldDate} → ${newDate}`);
    }
    
    return changes.length > 0 
      ? `<ul style="margin: 0; padding-left: 20px;">${changes.map(change => `<li style="margin: 4px 0;">${change}</li>`).join('')}</ul>`
      : 'Informações gerais do perfil foram atualizadas.';
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
