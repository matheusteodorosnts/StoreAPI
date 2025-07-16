import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDTO } from './DTO/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async registerNewUser(@Body() data: UserDTO) {
    const hash = await argon2.hash(data.password);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const payload = { sub: user.id, username: user.name };
    const acess_token = this.jwtService.sign(payload);

    return {
      user,
      acess_token,
    };
  }

  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  async loginUser(@Body() data: UserDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    const isPasswordValid = await argon2.verify(user.password, data.password);
    if (!isPasswordValid) {
      return { message: 'Invalid Password!' };
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
