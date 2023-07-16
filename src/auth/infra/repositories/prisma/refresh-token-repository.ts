import { PrismaClient, RefreshToken } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { RefreshTokenDto } from "src/auth/dto";
import { IRefreshTokenRepository } from "src/auth/interfaces";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRefreshToken({
    user_id,
    expires_at,
  }: RefreshTokenDto): Promise<RefreshToken> {
    const salt = bcrypt.genSaltSync(10);
    const token = bcrypt.hashSync(salt, 10);
    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        token: token,
        user_id,
        expires_at: new Date(Date.now() + expires_at),
      },
    });

    console.log("ERRORRRRRRRRRRR" + token);
    return refreshToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token: token },
    });

    return refreshToken;
  }

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { token: token } });
  }
}
