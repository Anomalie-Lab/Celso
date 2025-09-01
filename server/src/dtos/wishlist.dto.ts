import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class AddToWishlistDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsNumber()
  product_id: number;
}

export class RemoveFromWishlistDto {
  @ApiProperty({ description: 'ID do item da wishlist' })
  @IsNumber()
  itemId: number;
}
