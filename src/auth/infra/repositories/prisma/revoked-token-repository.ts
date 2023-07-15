import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class RevokedTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async revokeToken(token: string): Promise<void> {
    await this.prisma.revokedToken.create({ data: { token } });
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.prisma.revokedToken.findUnique({
      where: { token: token },
    });
    return !!revokedToken;

  }
}
