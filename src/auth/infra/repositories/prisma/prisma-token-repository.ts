import { PrismaClient, Token } from '@prisma/client';
import { ITokenRepository } from 'src/auth/interfaces/token-repository.interface';

export class TokenRepository implements ITokenRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createToken(userId: string, accessToken: string, refreshToken: string): Promise<Token> {
    const accessTokenExpiry = new Date();
    accessTokenExpiry.setMinutes(accessTokenExpiry.getMinutes() + 10); // Definir expiração em 10 minutos

    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setMinutes(refreshTokenExpiry.getMinutes() + 10); // Definir expiração em 10 minutos

    const createdToken = await this.prisma.token.create({
      data: {
        User: { connect: { id: userId } },
        access_token: accessToken,
        refresh_token: refreshToken,
        access_token_expiry: accessTokenExpiry,
        refresh_token_expiry: refreshTokenExpiry,
      },
    });

    return createdToken;
  }
}
