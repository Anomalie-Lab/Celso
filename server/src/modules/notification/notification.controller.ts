import {Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {ApiBody, ApiTags} from '@nestjs/swagger';
import {CreateNotificationDTO} from 'src/dtos/notification.dto';
import {User} from '../../decorators/user.decorator';
import {NotificationService} from './notification.service';

@ApiTags('Notication')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('')
  @ApiBody({type: CreateNotificationDTO, description: 'The request body must contain the user registration details.'})
  @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
  async create(@Body() dto: CreateNotificationDTO) {
    return await this.notificationService.create(dto);
  }

  @Get('')
  async get(@User() user) {
    return await this.notificationService.get(user.id);
  }

  @Patch('read/:id')
  async read(@Param('id') id: string) {
    return await this.notificationService.read(id);
  }

  @Patch('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.notificationService.delete(id);
  }
}
