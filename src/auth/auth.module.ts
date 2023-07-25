import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";

import { JwtStrategy } from "./domain/strategies";
import { UsersModule } from "@/users/users.module";
import { TokenController, UsersController } from "@/shared/infra/http";
import { UserRepository } from "@/users/infra/repositories";
import { JwtAuthGuard } from "./domain/guards";
import { RefreshTokenRepository } from "@/token/infra/repositories/prisma";
import { Refresh } from "@/token/domain/use-cases";
import {
  RegisterUserUseCase,
  GetUserUseCase,
  SoftDeleteUserUseCase,
} from "@/users/domain/use-cases";
import { ILoginRepository } from "@/auth/domain/interfaces/login-repository";
import { IUserRepository } from "@/users/domain/interfaces";
import { IRefreshTokenRepository } from "@/token/domain/interfaces";
import { LoginRepository } from "@/auth/infra/repositories/prisma/login-repository";
import { Login } from "@/auth/domain/use-case";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "10m" },
    }),
    UsersModule,
  ],
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
    {
      provide: ILoginRepository,
      useClass: LoginRepository,
    },
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRefreshTokenRepository,
      useClass: RefreshTokenRepository,
    },
  ],
  exports: [
    {
      provide: ILoginRepository,
      useClass: LoginRepository,
    },
  ],
  controllers: [UsersController, TokenController],
})
export class AuthModule {}
