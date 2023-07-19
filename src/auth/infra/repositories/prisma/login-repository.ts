import { PrismaClient, RefreshToken, User } from "@prisma/client";

export class LoginRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createRefreshToken(token: string, userId: string, expiresAt: Date): Promise<RefreshToken> {
    const refreshToken = this.prisma.refreshToken.create({
      data: {
        token,
        user_id: userId,
        expires_at: expiresAt,
      },
    });

    return refreshToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token: token },
    });

    return refreshToken;
  }
  
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
