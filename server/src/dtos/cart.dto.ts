import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'Product ID' })
  @IsNumber()
  product_id: number;

  @ApiProperty({ description: 'Quantity', default: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;

  @ApiProperty({ description: 'Size', default: 'M' })
  @IsOptional()
  @IsString()
  size?: string;

  @ApiProperty({ description: 'Color', default: 'Default' })
  @IsOptional()
  @IsString()
  color?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'Quantity' })
  @IsNumber()
  @Min(0)
  quantity: number;
}
