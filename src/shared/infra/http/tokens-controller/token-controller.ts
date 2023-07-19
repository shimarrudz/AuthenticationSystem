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
  async login(@Body() loginData: { email: string; password: string }): Promise<IUserToken> {
    const { email, password } = loginData;
    const userToken = await this.loginUseCase.execute(email, password);
    return userToken;
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<IRefreshPayloadToken> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }
}