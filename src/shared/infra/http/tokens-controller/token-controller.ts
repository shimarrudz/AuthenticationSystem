import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';

import { Login } from 'src/token/use-cases';
import { IUserToken } from 'src/token/interfaces';
import { Logout } from 'src/token/use-cases';
import { Refresh } from 'src/token/use-cases';

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

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string): Promise<IUserToken> {
    console.log('refreshToken:', refreshToken);
    return this.refreshTokenUseCase.execute(refreshToken);
  }
  

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken : string): Promise<void> {
    await this.logoutUseCase.execute(refreshToken);
  }
}
