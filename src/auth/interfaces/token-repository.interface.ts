import { Token } from "@prisma/client";

export interface ITokenRepository {
    createToken(user_id: string, access_token: string, refresh_token: string): Promise<Token>;
  }