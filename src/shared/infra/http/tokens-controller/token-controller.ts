import { Controller, Post, Body } from '@nestjs/common';
import { Login } from 'src/auth/use-cases/login/login';
import { IUserToken } from 'src/auth/interfaces';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: Login) {}

  @Post('login')
  async login(@Body() user: User): Promise<IUserToken> {
    const userToken = await this.loginUseCase.execute(user);
    return userToken;
  }
}
