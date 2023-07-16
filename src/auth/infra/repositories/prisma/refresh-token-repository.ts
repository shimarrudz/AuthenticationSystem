import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { RefreshTokenDto } from 'src/auth/dto';
import { RefreshToken } from '@prisma/client';
import { IRefreshTokenRepository } from 'src/auth/interfaces';


export class RefreshTokenRepository implements IRefreshTokenRepository {
  private prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRefreshToken({
    user,
    expiresAt,
  }: RefreshTokenDto): Promise<RefreshToken> {
    const token = bcrypt.genSaltSync(10);
    const refreshToken = await this.prisma.refreshToken.create({
      data: {
        token: token,
        userId: user.id, // Atualizado para user.id em vez de user
        expires_at: new Date(Date.now() + expiresAt),
      },
    });
  
    return refreshToken;
  }
  
  

  async findRefreshToken(token: string): Promise<RefreshToken> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token : token },
    });
  
    return refreshToken;
  }  

  async revokeRefreshToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { token : token } });
  }
}
