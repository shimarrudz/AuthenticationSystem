import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt'

import { IJwtPayload, IRefreshPayload } from '@/auth/interfaces';
import { IUserToken } from '@/token/interfaces';
import { LoginRepository } from '@/auth/infra/repositories/prisma/login-repository';

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: LoginRepository, 
  ) {}

  async execute(email: string, password: string): Promise<IUserToken> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(userId: string, email: string): string {
    const payload: IJwtPayload = {
      sub: userId,
      email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '5m',
    });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const payload: IRefreshPayload = {
      sub: userId,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '3m',
    });

    await this.refreshTokenRepository.createRefreshToken(refreshToken, userId, new Date(Date.now() + 3 * 60 * 1000));

    return refreshToken;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.refreshTokenRepository.findUserByEmail(email);
  }
}