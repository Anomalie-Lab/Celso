import { Module } from "@nestjs/common";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { PrismaService } from "src/services/prisma.service";
import { NotificationsGateway } from "src/services/gateways/notification.gateway";
import { AccountRepository, NotificationRepository } from "src/repositories";

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository, PrismaService, NotificationsGateway, AccountRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
