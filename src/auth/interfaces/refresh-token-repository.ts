import { RefreshTokenDto } from "../dto";
import { RefreshToken } from "@prisma/client";

export abstract class IRefreshTokenRepository {
  abstract createRefreshToken({
    user_id,
    expires_at,
  }: RefreshTokenDto): Promise<RefreshToken>;

  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  
  abstract revokeRefreshToken(token: string): Promise<void>;
}
