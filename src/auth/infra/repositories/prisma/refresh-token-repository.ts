import { PrismaClient, RefreshToken } from "@prisma/client";
import * as crypto from 'node:crypto'

import { RefreshTokenDto } from "src/auth/dto";
import { IRefreshTokenRepository } from "src/auth/interfaces";
import { IUserFromJwt } from "src/auth/interfaces";

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findUserById(userId: string): Promise<IUserFromJwt | null> {
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

  async createRefreshToken({
    user_id,
    expires_at,
  }: RefreshTokenDto): Promise<RefreshToken> {
    const refreshToken = this.prisma.refreshToken.create({
      data:{
        token: crypto.randomBytes(32).toString('hex'),
        user_id,
        expires_at: new Date(Date.now() + expires_at),
      },
    });

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

