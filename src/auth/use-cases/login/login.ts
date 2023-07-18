import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { RefreshTokenRepository } from 'src/auth/infra/repositories/prisma';
import { IUserToken, IJwtPayload } from 'src/auth/interfaces';

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
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
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '5m',
    });
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email
    };

    return this.jwtService.sign(payload, {
      expiresIn: '30s',
    })

  }
}
