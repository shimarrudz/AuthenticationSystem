import { RefreshToken } from "@prisma/client";

export abstract class IRefreshTokenRepository {
  
  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  
  abstract revokeRefreshToken(token: string): Promise<void>;
}
