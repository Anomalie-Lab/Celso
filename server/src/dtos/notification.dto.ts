import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, IsString, IsArray, IsObject} from 'class-validator';

export class CreateNotificationDTO {
  @ApiProperty({description: 'Tipo de notificação', example: 'offer'})
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({description: 'Título da notificação', example: 'Oferta Especial'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({description: 'Mensagem da notificação', example: 'Parabéns! Você ganhou 20% de desconto na sua próxima compra.'})
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({description: 'Data de leitura', example: null})
  @IsOptional()
  read_at: Date;

  @ApiPropertyOptional({
    description: 'Payload adicional da notificação (IDs, valores, etc)',
    example: {offerId: '123abc', amount: 1000, currency: 'BRL'},
    type: 'object',
    additionalProperties: true,
  })
  @IsOptional()
  @IsObject()
  data?: Record<string, any>;

  @ApiProperty({description: 'Lista de IDs de usuários que vão receber a notificação. Se estiver vazio, será enviada para todos.', type: [Number], example: [301]})
  @IsArray()
  @IsOptional()
  users: number[];
}
