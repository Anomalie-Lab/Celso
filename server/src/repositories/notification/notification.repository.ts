import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";
import { CreateNotificationDTO } from "src/dtos/notification.dto";

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: Omit<CreateNotificationDTO, "users">, user_id: number) {
    return await this.prisma.notification.create({
      data: {
        type: dto.type,
        title: dto.title,
        message: dto.message,
        data: dto.data,
        user: {
          connect: { id: user_id },
        },
      },
    });
  }

  async get(user_id: number) {
    return await this.prisma.notification.findMany({
      where: { user_id, deleted_at: null },
      orderBy: { created_at: "desc" },
    });
  }

  async read(id: number) {
    return await this.prisma.notification.update({ where: { id }, data: { read_at: new Date() } });
  }

  async delete(id: number) {
    return await this.prisma.notification.update({ where: { id }, data: { deleted_at: new Date() } });
  }
}
