import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { IRefreshTokenRepository } from 'src/auth/interfaces';
import { IUserToken } from 'src/auth/interfaces';

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(user: User): Promise<IUserToken> {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };
  
    return this.jwtService.sign(payload, {
      expiresIn: '5m',
    });
  }
  
  private async generateRefreshToken(user: User): Promise<string> {
    const refreshTokenExpiresIn = 2 * 24 * 60 * 60 * 500;
    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      user: user.id,
      expiresAt: refreshTokenExpiresIn,
    });

    return refreshToken.token;
  }
}
