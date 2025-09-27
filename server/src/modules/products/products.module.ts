import {Module} from '@nestjs/common';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {PrismaService} from '../../services/prisma.service';
import {ProductsRepository} from '../../repositories/products/products.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}
