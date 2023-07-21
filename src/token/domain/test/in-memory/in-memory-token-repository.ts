import { UserFromJwtDto } from "@/auth/domain/dto";
import { IRefreshTokenRepository } from "../../interfaces";
import { RefreshToken } from "@prisma/client";

export class InMemoryRefreshToken implements IRefreshTokenRepository {
  private refreshTokens: RefreshToken[];

  constructor() {
    this.refreshTokens = [];
  }

  async findUserById(userId: string): Promise<UserFromJwtDto | null> {
    // Procurar o token do usuário pelo userId no objeto de tokens
    const token = this.refreshTokens[userId];

    if (token) {
      // Se encontrarmos o token, podemos retornar informações do usuário fictícias
      return { id: userId, email: "exemplo@example.com" };
    }

    return null; // Se não encontrarmos o token, retornamos null indicando que o usuário não existe
  }

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    // Implement the logic to find the refresh token here using the in-memory approach
    // For in-memory implementation, you can use the refreshTokens array to find the refresh token by its token value
    const refreshToken = this.refreshTokens.find((token) => token === token);
    return refreshToken || null;
  }

}
