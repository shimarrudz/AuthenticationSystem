import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login-dto';
import { LoginUseCase } from 'src/auth/use-cases/login/login-use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await this.loginUseCase.execute(loginDto);
    return { accessToken, refreshToken };
  }
}
