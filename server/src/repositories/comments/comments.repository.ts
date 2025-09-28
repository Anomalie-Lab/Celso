import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { CreateCommentDto, UpdateCommentDto } from '../../dtos/comments.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto & { user_id: number }) {
    return this.prisma.productComment.create({
      data: {
        message: data.message,
        rating: data.rating,
        attachments: data.attachments,
        user_id: data.user_id,
        product_id: data.product_id,
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findByProductId(productId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    
    const [comments, total] = await Promise.all([
      this.prisma.productComment.findMany({
        where: { product_id: productId },
        include: {
          user: {
            select: {
              id: true,
              fullname: true,
              avatar: true,
            },
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.productComment.count({
        where: { product_id: productId },
      }),
    ]);

    return {
      comments,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: number) {
    return this.prisma.productComment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateCommentDto) {
    return this.prisma.productComment.update({
      where: { id },
      data: {
        message: data.message,
        rating: data.rating,
        attachments: data.attachments,
        updated_at: new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.productComment.delete({
      where: { id },
    });
  }

  async getProductRatingStats(productId: number) {
    const stats = await this.prisma.productComment.aggregate({
      where: { product_id: productId },
      _count: { rating: true },
      _avg: { rating: true },
    });

    const ratingDistribution = await this.prisma.productComment.groupBy({
      by: ['rating'],
      where: { product_id: productId },
      _count: { rating: true },
    });

    return {
      totalComments: stats._count.rating,
      averageRating: stats._avg.rating || 0,
      ratingDistribution: ratingDistribution.map(item => ({
        rating: item.rating,
        count: item._count.rating,
      })),
    };
  }

  async findByUserAndProduct(userId: number, productId: number) {
    return this.prisma.productComment.findFirst({
      where: {
        user_id: {
          equals: userId
        },
        product_id: {
          equals: productId
        }
      },
      include: {
        user: {
          select: {
            id: true,
            fullname: true,
            avatar: true,
          },
        },
      },
    });
  }
}
