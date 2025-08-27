import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsNumber, IsOptional, IsArray, Min} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({description: 'Product title'})
  @IsString()
  title: string;

  @ApiProperty({description: 'Product summary'})
  @IsString()
  summary: string;

  @ApiProperty({description: 'Product description'})
  @IsString()
  description: string;

  @ApiProperty({description: 'Product brand'})
  @IsString()
  brand: string;

  @ApiProperty({description: 'Product price'})
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({description: 'Product last price'})
  @IsNumber()
  @Min(0)
  last_price: number;

  @ApiProperty({description: 'Number of installments'})
  @IsNumber()
  @Min(1)
  installments: number;

  @ApiProperty({description: 'Product blur image', required: false})
  @IsOptional()
  @IsString()
  blur?: string;

  @ApiProperty({description: 'Product details', required: false})
  @IsOptional()
  details?: any;

  @ApiProperty({description: 'Product flags', required: false})
  @IsOptional()
  @IsArray()
  flags?: string[];

  @ApiProperty({description: 'Product categories', required: false})
  @IsOptional()
  @IsArray()
  categories?: string[];

  @ApiProperty({description: 'Product sizes', required: false})
  @IsOptional()
  @IsArray()
  sizes?: string[];

  @ApiProperty({description: 'Product stock'})
  @IsNumber()
  @Min(0)
  stock: number;
}

export class UpdateProductDto {
  @ApiProperty({description: 'Product title', required: false})
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({description: 'Product summary', required: false})
  @IsOptional()
  @IsString()
  summary?: string;

  @ApiProperty({description: 'Product description', required: false})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({description: 'Product brand', required: false})
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({description: 'Product price', required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({description: 'Product last price', required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  last_price?: number;

  @ApiProperty({description: 'Number of installments', required: false})
  @IsOptional()
  @IsNumber()
  @Min(1)
  installments?: number;

  @ApiProperty({description: 'Product blur image', required: false})
  @IsOptional()
  @IsString()
  blur?: string;

  @ApiProperty({description: 'Product details', required: false})
  @IsOptional()
  details?: any;

  @ApiProperty({description: 'Product flags', required: false})
  @IsOptional()
  @IsArray()
  flags?: string[];

  @ApiProperty({description: 'Product categories', required: false})
  @IsOptional()
  @IsArray()
  categories?: string[];

  @ApiProperty({description: 'Product sizes', required: false})
  @IsOptional()
  @IsArray()
  sizes?: string[];

  @ApiProperty({description: 'Product stock', required: false})
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
