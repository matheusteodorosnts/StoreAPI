import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
})
export class ProductModule {}
