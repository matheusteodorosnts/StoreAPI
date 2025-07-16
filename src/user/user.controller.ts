import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDTO } from 'src/auth/DTO/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Patch(':iduser/edit')
  async updateUser(@Param('iduser') iduser: string, @Body() data: UserDTO) {
    const user = await this.prisma.user.update({
      where: { id: iduser },
      data,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      user,
    };
  }

  @Delete(':iduser/delete')
  async deleteUser(@Param('iduser') iduser: string) {
    const user = await this.prisma.user.delete({
      where: { id: iduser },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      user,
    };
  }

  @Get(':iduser')
  @UseGuards(AuthGuard('jwt'))
  async getSpecificUser(@Param('iduser') iduser: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: iduser },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return {
      user,
    };
  }
}
