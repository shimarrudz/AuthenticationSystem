import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { Refresh } from "@/token/domain/use-cases/refresh-token/refresh-token";
import { Login } from "@/auth/domain/use-case";
import { TokenController } from "@/shared/infra/http";
import { LoginRepository } from "@/auth/infra/repositories/prisma";
import { RefreshTokenRepository } from "./infra/repositories/prisma";
import { IRefreshTokenRepository } from "./domain/interfaces";
import { IUserRepository } from "@/users/domain/interfaces";
import { UserRepository } from "@/users/infra/repositories";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "5m" },
    }),
  ],
  providers: [
    Login,
    RefreshTokenRepository,
    Refresh,
    LoginRepository,
    {
      provide: IRefreshTokenRepository,
      useClass: RefreshTokenRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    }
  ],
  exports: [
    {
      provide: IRefreshTokenRepository,
      useClass: RefreshTokenRepository,
    },
  ],
  controllers: [TokenController],
})
export class TokenModule {}
