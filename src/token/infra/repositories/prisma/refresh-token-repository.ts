import { UserFromJwtDto } from "@/auth/domain/dto";

import { IRefreshTokenRepository } from "@/token/domain/interfaces";
import { PrismaClient, RefreshToken } from "@prisma/client";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserById(userId: string): Promise<UserFromJwtDto | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
      },
    });

    return user ? { id: user.id, email: user.email } : null;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token: token },
    });

    return refreshToken;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { token: token } });
  }
}
