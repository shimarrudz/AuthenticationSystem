import { User } from '@prisma/client';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { Login, Refresh } from 'src/token/use-cases';
import { IUserToken, IRefreshPayloadToken } from 'src/token/interfaces';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('auth')
export class TokenController {
  constructor(
    private readonly loginUseCase: Login,
    private readonly refreshTokenUseCase: Refresh,
  ) {}

  @Post('login')
  async login(@Body() user: User): Promise<IUserToken> {
    const userToken = await this.loginUseCase.execute(user);
    return userToken;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<IRefreshPayloadToken> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }
}