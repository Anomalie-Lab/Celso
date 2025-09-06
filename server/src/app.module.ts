import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './modules/auth/guard/auth.guard';
import {ScheduleModule} from '@nestjs/schedule';
import * as ImportModules from './modules/modules';
import {MailerService} from './services/mailer.sevice';
import {PrismaService} from './services/prisma.service';
import {CartSchedulerService} from './services/cart-scheduler.service';

const modules = Object.values(ImportModules);

@Module({
  imports: [ScheduleModule.forRoot(), ...modules],
  controllers: [AppController],
  providers: [{provide: APP_GUARD, useClass: AuthGuard}, PrismaService, MailerService, CartSchedulerService, AppService],
  exports: [PrismaService],
})
export class AppModule {}
