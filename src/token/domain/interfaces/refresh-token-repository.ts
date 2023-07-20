import { UserFromJwtDto } from "@/auth/domain/dto";
import { RefreshToken } from "@prisma/client";

export abstract class IRefreshTokenRepository {
  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  abstract revokeRefreshToken(token: string): Promise<void>;
  abstract findUserById(userId: string): Promise<UserFromJwtDto | null>
}
