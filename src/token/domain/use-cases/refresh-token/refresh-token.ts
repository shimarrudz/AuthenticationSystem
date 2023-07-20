import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';

import { JwtPayloadDto, UserFromJwtDto } from '@/auth/domain/dto';
import { RefreshPayloadTokenDto } from '../../dto';
import { HttpExceptionConstants } from '@/shared/constants';
import { IRefreshTokenRepository } from '../../interfaces';

@Injectable()
export class Refresh {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<RefreshPayloadTokenDto> {
    const user = await this.validateRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken(user);

    return {
      accessToken,
    };
  }

  private async validateRefreshToken(refreshToken: string): Promise<UserFromJwtDto> {
    const token = await this.refreshTokenRepository.findRefreshToken(refreshToken);
    if (!token) {
      throw new NotFoundException(HttpExceptionConstants.TOKEN_NOT_FOUND.message);
    }

    try {
      const decodedToken: any = jwt.verify(refreshToken, process.env.JWT_SECRET);

      const user = await this.refreshTokenRepository.findUserById(decodedToken.sub);

      if (!user) {
        throw new UnauthorizedException(HttpExceptionConstants.INVALID_REFRESH_TOKEN.message);
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException(HttpExceptionConstants.INVALID_REFRESH_TOKEN.message);
    }
  }

  private generateAccessToken(user: UserFromJwtDto): string {
    const payload: JwtPayloadDto = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '5m',
    });
  }
}
