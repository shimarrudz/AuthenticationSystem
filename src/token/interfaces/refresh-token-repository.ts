import { Prisma, RefreshToken } from "@prisma/client";

export interface IRefreshTokenRepository {
  findRefreshToken(token: string): Promise<RefreshToken>;
  revokeRefreshToken(token: string): Promise<void>;
}
