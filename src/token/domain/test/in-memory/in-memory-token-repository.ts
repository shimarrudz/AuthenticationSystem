import { UserFromJwtDto } from "@/auth/domain/dto";
import { IRefreshTokenRepository } from "@/token/domain/interfaces/";
import { RefreshToken } from "@prisma/client";

export class InMemoryRefreshToken implements IRefreshTokenRepository {
  private refreshTokens: RefreshToken[];

  constructor() {
    this.refreshTokens = [];
  }

  async findUserById(userId: string): Promise<UserFromJwtDto | null> {
    const token = this.refreshTokens[userId];

    if (token) {
      return { id: userId, email: "exemplo@example.com" };
    }

    return null;
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = this.refreshTokens.find((token) => token === token);
    return refreshToken || null;
  }

}
