import { Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "src/auth/infra/repositories/prisma";

@Injectable()
export class Logout {
  constructor(private refreshTokenRepository: RefreshTokenRepository) {}

  async execute(refreshToken: string): Promise<void> {
    await this.refreshTokenRepository.revokeRefreshToken(refreshToken);
  }
}

