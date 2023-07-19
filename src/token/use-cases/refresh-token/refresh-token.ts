import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { RefreshTokenRepository } from 'src/token/infra/repositories/prisma';
import { IUserFromJwt } from '../../../auth/interfaces';
import { IUserToken } from 'src/token/interfaces';
import { IJwtPayload } from '../../../auth/interfaces';
import { IRefreshPayloadToken } from 'src/token/interfaces/refresh-payload-token';


@Injectable()
export class Refresh {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshPayloadToken> {
    const user = await this.validateRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  private async validateRefreshToken(refreshToken: string): Promise<IUserFromJwt> {
    const token = await this.refreshTokenRepository.findRefreshToken(refreshToken);
    if(!token) {
      throw new Error('Token not found')
    }
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
      expiresIn: '5m',
    });
  }
}