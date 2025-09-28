import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from '../../services/comments.service';
import { CommentsRepository } from '../../repositories/comments/comments.repository';
import { PrismaService } from '../../services/prisma.service';
import { UploadService } from '../../services/upload.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PrismaService, UploadService],
  exports: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
