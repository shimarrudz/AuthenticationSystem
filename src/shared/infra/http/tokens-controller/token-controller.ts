import { User } from '@prisma/client';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards';
import { Login, Refresh } from '@/token/use-cases';
import { IUserToken, IRefreshPayloadToken } from '@/token/interfaces';


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