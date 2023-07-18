import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";

import { JwtStrategy } from "./strategies/jwt-strategy";
import { JwtAuthGuard } from "./guards";
import { TokenController } from "src/shared/infra/http";
import { RefreshTokenRepository } from "src/token/infra/repositories/prisma";
import { Login, Logout, Refresh } from "src/token/use-cases";
import { UsersController } from "src/shared/infra/http";
import { RegisterUserUseCase } from "src/users/use-cases";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "src/users/use-cases/get-user/get-user";
import { SoftDeleteUserUseCase } from "src/users/use-cases/soft-delete/soft-delete";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10m' },
    }),
    UsersModule, 
  ],
  controllers: [UsersController, TokenController],
  providers: [
    RefreshTokenRepository,
    UserRepository,
    Refresh,
    RegisterUserUseCase,
    GetUserUseCase,
    SoftDeleteUserUseCase,
    Login,
    Logout,
    JwtAuthGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}