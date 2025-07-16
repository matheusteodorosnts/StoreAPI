import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDTO } from './DTO/product.dto';

@Controller('product')
export class ProductController {
  constructor(private prisma: PrismaService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createNewProduct(@Body() data: ProductDTO) {
    const product = await this.prisma.product.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        categoryId: false,
        category: true,
      },
    });

    return {
      product,
    };
  }

  @Patch(':idproduct/edit')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProduct(
    @Param('idproduct') idproduct: string,
    @Body() data: Partial<ProductDTO>,
  ) {
    const product = await this.prisma.product.update({
      where: { id: idproduct },
      data,
      select: {
        name: true,
        description: true,
        price: true,
      },
    });

    return {
      product,
    };
  }

  @Delete(':idproduct/delete')
  async deleteProduct(@Param('idproduct') idproduct: string) {
    const product = await this.prisma.product.delete({
      where: { id: idproduct },
      select: {
        name: true,
      },
    });

    return {
      product,
    };
  }

  @Get('all')
  async getAllProducts() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: {
          select: {
            id: false,
            name: true,
          },
        },
      },
    });

    return {
      products,
    };
  }

  @Get(':idproduct')
  async getSpecificProduct(@Param('idproduct') idproduct: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: idproduct },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      product,
    };
  }
}
