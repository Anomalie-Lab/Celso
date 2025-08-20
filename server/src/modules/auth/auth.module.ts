import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { MailerService } from "../../services/mailer.sevice";
import { PrismaService } from "../../services/prisma.service";
import { AuthRepository } from "src/repositories";

@Module({
  providers: [AuthService, AuthRepository, MailerService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
