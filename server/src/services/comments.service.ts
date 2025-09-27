import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CommentsRepository } from '../repositories/comments/comments.repository';
import { CreateCommentDto, UpdateCommentDto } from '../dtos/comments.dto';
import { UploadService } from './upload.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly uploadService: UploadService
  ) {}

  async create(data: CreateCommentDto, userId: number) {
    // Processar anexos se existirem
    let processedAttachments: any[] | undefined = undefined;
    if (data.attachments && data.attachments.length > 0) {
      processedAttachments = await Promise.all(
        data.attachments.map(async (attachment) => {
          if (attachment.url.startsWith('data:')) {
            // É um arquivo base64, salvar localmente
            const fileUrl = await this.uploadService.saveFile(
              attachment.url,
              attachment.alt || `attachment.${attachment.type === 'image' ? 'jpg' : 'mp4'}`,
              attachment.type
            );
            return {
              ...attachment,
              url: fileUrl
            };
          }
          return attachment;
        })
      );
    }

    return this.commentsRepository.create({
      ...data,
      user_id: userId!,
      attachments: processedAttachments,
    });
  }

  async findByProductId(productId: number, page: number = 1, limit: number = 10) {
    return this.commentsRepository.findByProductId(productId, page, limit);
  }

  async findById(id: number) {
    const comment = await this.commentsRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comentário não encontrado');
    }
    return comment;
  }

  async update(id: number, data: UpdateCommentDto, userId: number) {
    const comment = await this.findById(id);
    
    // Verificar se o usuário é o dono do comentário
    if (comment.user_id !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este comentário');
    }

    // Processar anexos se existirem
    let processedAttachments: any[] | undefined = data.attachments;
    if (data.attachments && data.attachments.length > 0) {
      processedAttachments = await Promise.all(
        data.attachments.map(async (attachment) => {
          if (attachment.url.startsWith('data:')) {
            // É um arquivo base64, salvar localmente
            const fileUrl = await this.uploadService.saveFile(
              attachment.url,
              attachment.alt || `attachment.${attachment.type === 'image' ? 'jpg' : 'mp4'}`,
              attachment.type
            );
            return {
              ...attachment,
              url: fileUrl
            };
          }
          return attachment;
        })
      );
    }

    return this.commentsRepository.update(id, {
      ...data,
      attachments: processedAttachments,
    });
  }

  async delete(id: number, userId: number) {
    const comment = await this.findById(id);
    
    // Verificar se o usuário é o dono do comentário
    if (comment.user_id !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir este comentário');
    }

    return this.commentsRepository.delete(id);
  }

  async getProductRatingStats(productId: number) {
    return this.commentsRepository.getProductRatingStats(productId);
  }

  async getUserCommentForProduct(userId: number, productId: number) {
    return this.commentsRepository.findByUserAndProduct(userId, productId);
  }
}
