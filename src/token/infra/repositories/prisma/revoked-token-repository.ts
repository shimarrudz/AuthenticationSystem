import { PrismaClient } from '@prisma/client';

export class RevokedTokenRepository {
  constructor(private prisma: PrismaClient) {}

  async revokeToken(token: string): Promise<void> {
    await this.prisma.revokedToken.create({ data: { token } });
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    if (!this.prisma.revokedToken) {
      throw new Error('Prisma revokedToken not defined');
    }
    const revokedToken = await this.prisma.revokedToken.findUnique({
      where: { token: token },
    });
    return !!revokedToken;
  }
}
