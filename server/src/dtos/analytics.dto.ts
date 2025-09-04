import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnalyticsDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsNumber()
  product_id: number;

  @ApiProperty({ description: 'Ação realizada', enum: ['view', 'wishlist_add', 'cart_add', 'purchase', 'search'] })
  @IsString()
  action: string;

  @ApiPropertyOptional({ description: 'Fonte da ação' })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ description: 'User agent do navegador' })
  @IsOptional()
  @IsString()
  user_agent?: string;

  @ApiPropertyOptional({ description: 'Referrer da página' })
  @IsOptional()
  @IsString()
  referrer?: string;

  @ApiPropertyOptional({ description: 'Endereço IP' })
  @IsOptional()
  @IsString()
  ip_address?: string;

  @ApiPropertyOptional({ description: 'ID da sessão' })
  @IsOptional()
  @IsString()
  session_id?: string;

  @ApiPropertyOptional({ description: 'ID do usuário (se autenticado)' })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiPropertyOptional({ description: 'Metadados adicionais' })
  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class AnalyticsQueryDto {
  @ApiPropertyOptional({ description: 'Número de dias para análise', default: 30 })
  @IsOptional()
  @IsNumber()
  days?: number = 30;

  @ApiPropertyOptional({ description: 'Data de início' })
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ description: 'Data de fim' })
  @IsOptional()
  endDate?: string;
}
