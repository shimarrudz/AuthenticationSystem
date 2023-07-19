import { Injectable, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { IJwtPayload } from 'src/auth/interfaces';
import { IUserToken } from 'src/token/interfaces';
import { LoginRepository } from 'src/auth/infra/repositories/prisma/login-repository';

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: LoginRepository, 
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

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '3m',
    });

    // Salve o refreshToken no banco de dados usando a repository
    await this.refreshTokenRepository.createRefreshToken(refreshToken, user.id, new Date(Date.now() + 3 * 60 * 1000));

    return refreshToken;
  }
}
