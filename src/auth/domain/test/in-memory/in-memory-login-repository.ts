import { PrismaClient, RefreshToken, User } from "@prisma/client";
import { ILoginRepository } from "../../interfaces/login-repository";
export class InMemoryLoginRepository implements ILoginRepository {
    prisma: PrismaClient; 
  
    private refreshTokens: RefreshToken[];
    private users: User[];
  
    constructor() {
      this.prisma = new PrismaClient();
      this.refreshTokens = [];
      this.users = [];
    }
  

  async createRefreshToken(
    token: string,
    userId: string,
    expiresAt: Date
  ): Promise<RefreshToken> {
    const newRefreshToken: RefreshToken = {
      id: Math.random().toString(),
      token,
      user_id: userId,
      created_at: new Date(),
      expires_at: expiresAt,
    };
    this.refreshTokens.push(newRefreshToken);
    return newRefreshToken;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = this.refreshTokens.find(
      (refreshToken) => refreshToken.token === token
    );
    return refreshToken || null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }
}
