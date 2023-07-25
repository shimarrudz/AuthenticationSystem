import { UserFromJwtDto } from "@/auth/domain/dto";
import { RefreshToken } from "@prisma/client";

export abstract class IRefreshTokenRepository {
  abstract findRefreshToken(token: string): Promise<RefreshToken>;
  abstract findUserById(userId: string): Promise<UserFromJwtDto | null>;
}
