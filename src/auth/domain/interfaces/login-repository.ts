import { RefreshToken, User, PrismaClient } from "@prisma/client";

export abstract class ILoginRepository {
  prisma: PrismaClient;
  abstract createRefreshToken(
    token: string,
    userId: string,
    expiresAt: Date
  ): Promise<RefreshToken>;
  abstract findRefreshToken(token: string): Promise<RefreshToken | null>;
  abstract findUserByEmail(email: string): Promise<User | null>;
}
