import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';

import { Login } from 'src/auth/use-cases/login/login';
import { IUserToken } from 'src/auth/interfaces';
import { Logout } from 'src/auth/use-cases/logout/logout';
import { Refresh } from 'src/auth/use-cases/refresh-token/refresh-token';
import { RefreshTokenDto } from 'src/auth/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: Login,
    private readonly refreshTokenUseCase: Refresh,
    private readonly logoutUseCase: Logout
    ) {}

  @Post('login')
  async login(@Body() user: User): Promise<IUserToken> {
    const userToken = await this.loginUseCase.execute(user);
    return userToken;
  }
}

@Post('refresh')
async refresh(@Body() { refreshToken }: RefreshTokenDto): Promise<IUserToken> {
  const userToken = await this.refreshTokenUseCase.execute(refreshToken);
  return userToken;
}
