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
import { CategoryDTO } from './DTO/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private prisma: PrismaService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createNewCategory(@Body() data: CategoryDTO) {
    const category = await this.prisma.category.create({
      data,
    });

    return {
      category,
    };
  }

  @Patch(':idcategory/edit')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateCategory(
    @Param('idcategory') idcategory: string,
    @Body() data: CategoryDTO,
  ) {
    const category = await this.prisma.category.update({
      where: { id: idcategory },
      data,
      select: {
        name: true,
      },
    });

    return {
      category,
    };
  }

  @Delete(':idcategory/delete')
  async deleteCategory(@Param('idcategory') idcategory: string) {
    const category = await this.prisma.category.delete({
      where: { id: idcategory },
      select: {
        name: true,
      },
    });

    return {
      category,
    };
  }

  @Get('all')
  async getAllCategories() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        products: true,
      },
    });

    return {
      categories,
    };
  }
}
