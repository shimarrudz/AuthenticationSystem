import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';


import { Login } from 'src/token/use-cases';
import { IUserToken } from 'src/token/interfaces';
import { Logout } from 'src/token/use-cases';
import { Refresh } from 'src/token/use-cases';
import { IRefreshPayloadToken } from 'src/token/interfaces/refresh-payload-token';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('auth')
export class TokenController {
  constructor(
    private readonly loginUseCase: Login,
    private readonly refreshTokenUseCase: Refresh,
    private readonly logoutUseCase: Logout,
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