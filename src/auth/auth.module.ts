import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

import { JwtStrategy } from "./strategies";
import { UsersModule } from "@/users/users.module";
import { UsersController, TokenController } from "@/shared/infra/http";
import { UserRepository } from "@/users/infra/repositories";
import { JwtAuthGuard } from "./guards";
import { LoginRepository } from "./infra/repositories/prisma";
import { RefreshTokenRepository } from "@/token/infra/repositories/prisma";
import { Login } from "./use-case";
import { Refresh } from "@/token/use-cases";
import { RegisterUserUseCase, GetUserUseCase, SoftDeleteUserUseCase } from "@/users/use-cases";

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
    JwtAuthGuard,
    JwtStrategy,
    LoginRepository,
  ],
})
export class AuthModule {}