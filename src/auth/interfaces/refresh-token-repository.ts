import { RefreshTokenDto } from "../dto";
import { RefreshToken } from "@prisma/client";

export abstract class IRefreshTokenRepository {
  abstract createRefreshToken(data: RefreshTokenDto): Promise<RefreshToken>;
  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  abstract revokeRefreshToken(token: string): Promise<void>;
}
