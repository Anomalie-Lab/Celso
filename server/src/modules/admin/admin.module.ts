import {Module} from '@nestjs/common';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';
import {PrismaService} from '../../services/prisma.service';
import {MailerService} from '../../services/mailer.sevice';
import {AdminRepository} from '../../repositories/admin/admin.repository';

@Module({
  controllers: [AdminController],
  providers: [AdminService, AdminRepository, PrismaService, MailerService],
  exports: [AdminService],
})
export class AdminModule {}
