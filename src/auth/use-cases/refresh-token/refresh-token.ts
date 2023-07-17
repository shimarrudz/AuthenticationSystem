import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { RefreshTokenRepository } from 'src/auth/infra/repositories/prisma';
import { IUserToken, IUserFromJwt } from '../../interfaces';
import { IJwtPayload } from '../../interfaces';


@Injectable()
export class Refresh {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<IUserToken> {
    const user = await this.validateRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
      refreshToken
    };
  }

  private async validateRefreshToken(refreshToken: string): Promise<IUserFromJwt> {
    const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_SECRET);

    console.log('DECODED TOKEN:', decodedToken);

    const user = await this.refreshTokenRepository.findUserById(decodedToken.sub);

    if (!user) {
      throw new UnauthorizedException('Refresh token inválido!');
    }

    return user;
  }

  private generateAccessToken(user: IUserFromJwt): string {
    const payload: IJwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '10m',
    });
  }
}