import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from 'src/auth/infra/repositories/prisma';
import { IUserToken, IJwtPayload, IUserFromJwt } from '../../interfaces';

@Injectable()
export class Refresh {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async execute(refreshToken: string): Promise<IUserToken> {
    const user = await this.validateRefreshToken(refreshToken);

    const accessToken = this.generateAccessToken(user);
    const newRefreshToken = await this.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async validateRefreshToken(refreshToken: string): Promise<IUserFromJwt> {
    const payload = this.jwtService.verify<IJwtPayload>(refreshToken);

    const user = await this.refreshTokenRepository.findUserByRefreshToken(payload.sub, refreshToken);

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

  private async generateRefreshToken(user: IUserFromJwt): Promise<string> {
    const refreshTokenExpiresIn = 2 * 24 * 60 * 60 * 500;
    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      user_id: user.id,
      expires_at: refreshTokenExpiresIn,
    });

    return refreshToken.token;
  }
}
