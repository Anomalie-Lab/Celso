import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'Mensagem do comentário', example: 'Produto excelente, recomendo!' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Avaliação de 1 a 5 estrelas', example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ 
    description: 'Anexos do comentário (imagens, vídeos)', 
    required: false,
    example: [
      { type: 'image', url: 'https://example.com/image.jpg', alt: 'Imagem do produto' },
      { type: 'video', url: 'https://example.com/video.mp4', thumbnail: 'https://example.com/thumb.jpg' }
    ]
  })
  @IsOptional()
  attachments?: Array<{
    type: 'image' | 'video';
    url: string;
    alt?: string;
    thumbnail?: string;
  }>;

  @ApiProperty({ description: 'ID do produto', example: 1 })
  @IsInt()
  product_id: number;
}

export class UpdateCommentDto {
  @ApiProperty({ description: 'Mensagem do comentário', example: 'Produto excelente, recomendo!', required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ description: 'Avaliação de 1 a 5 estrelas', example: 5, minimum: 1, maximum: 5, required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ 
    description: 'Anexos do comentário (imagens, vídeos)', 
    required: false,
    example: [
      { type: 'image', url: 'https://example.com/image.jpg', alt: 'Imagem do produto' },
      { type: 'video', url: 'https://example.com/video.mp4', thumbnail: 'https://example.com/thumb.jpg' }
    ]
  })
  @IsOptional()
  attachments?: Array<{
    type: 'image' | 'video';
    url: string;
    alt?: string;
    thumbnail?: string;
  }>;
}

export class CommentResponseDto {
  @ApiProperty({ description: 'ID do comentário', example: 1 })
  id: number;

  @ApiProperty({ description: 'Mensagem do comentário', example: 'Produto excelente, recomendo!' })
  message: string;

  @ApiProperty({ description: 'Avaliação de 1 a 5 estrelas', example: 5 })
  rating: number;

  @ApiProperty({ 
    description: 'Anexos do comentário (imagens, vídeos)', 
    required: false,
    example: [
      { type: 'image', url: 'https://example.com/image.jpg', alt: 'Imagem do produto' },
      { type: 'video', url: 'https://example.com/video.mp4', thumbnail: 'https://example.com/thumb.jpg' }
    ]
  })
  attachments?: Array<{
    type: 'image' | 'video';
    url: string;
    alt?: string;
    thumbnail?: string;
  }>;

  @ApiProperty({ description: 'ID do usuário', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'ID do produto', example: 1 })
  product_id: number;

  @ApiProperty({ description: 'Data de criação' })
  created_at: Date;

  @ApiProperty({ description: 'Data de atualização' })
  updated_at: Date;

  @ApiProperty({ description: 'Informações do usuário' })
  user: {
    id: number;
    fullname: string;
    avatar: string;
  };
}
