import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/domain/guards";
import { Login } from "@/auth/domain/use-case";
import { Refresh } from "@/token/domain/use-cases";
import { UserTokenDto, RefreshPayloadTokenDto } from "@/token/domain/dto";

@Controller("token")
export class TokenController {
  constructor(
    private readonly loginUseCase: Login,
    private readonly refreshTokenUseCase: Refresh
  ) {}

  @Post("login")
  async login(
    @Body() loginData: { email: string; password: string }
  ): Promise<UserTokenDto> {
    const { email, password } = loginData;
    const userToken = await this.loginUseCase.execute(email, password);
    return userToken;
  }

  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refresh(
    @Body("refreshToken") refreshToken: string
  ): Promise<RefreshPayloadTokenDto> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }
}
