import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

import { JwtStrategy } from "./domain/strategies";
import { UsersModule } from "@/users/users.module";
import { UsersController, TokenController } from "@/shared/infra/http";
import { UserRepository } from "@/users/infra/repositories";
import { JwtAuthGuard } from "./domain/guards";
import { LoginRepository } from "./infra/repositories/prisma";
import { RefreshTokenRepository } from "@/token/infra/repositories/prisma";
import { Login } from "./domain/use-case";
import { Refresh } from "@/token/domain/use-cases";
import { RegisterUserUseCase, GetUserUseCase, SoftDeleteUserUseCase } from "@/users/domain/use-cases";

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