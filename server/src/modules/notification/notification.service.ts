import {Injectable} from '@nestjs/common';
import {CreateNotificationDTO} from 'src/dtos/notification.dto';
import {AccountRepository} from 'src/repositories';
import {NotificationRepository} from 'src/repositories/notification/notification.repository';
import {NotificationsGateway} from 'src/services/gateways/notification.gateway';
import {HandleErrorsUserConflict} from 'src/utils/handle-errors-database.util';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly accountRepository: AccountRepository,
    private readonly notificationsGateway: NotificationsGateway
  ) {}

  async create({users: ids, ...dto}: CreateNotificationDTO) {
    try {
      let userIds: number[] = [];

      if (ids.length === 0) {
        const allUsers = await this.accountRepository.findAll({ids: []});
        userIds = allUsers.map((user) => user.id);
      } else {
        userIds = ids;
      }

      const notifications = await Promise.all(
        userIds.map(async (userId) => {
          const notification = await this.notificationRepository.create(dto, userId);
          this.notificationsGateway.sendToUser(String(userId), {...notification});
          return notification;
        })
      );

      return notifications;
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async get(user_id: number) {
    try {
      return await this.notificationRepository.get(user_id);
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async read(id: string) {
    try {
      return await this.notificationRepository.read(+id);
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }

  async delete(id: string) {
    try {
      return await this.notificationRepository.delete(+id);
    } catch (error) {
      HandleErrorsUserConflict(error);
    }
  }
}
