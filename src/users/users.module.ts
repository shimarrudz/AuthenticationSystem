import { Module } from "@nestjs/common";

import { UsersController } from "@/shared/infra/http";
import { UserRepository } from "./infra/repositories";
import {
  RegisterUserUseCase,
  GetUserUseCase,
  SoftDeleteUserUseCase,
} from "./domain/use-cases";
import { IUserRepository } from "./domain/interfaces";
import { IRefreshTokenRepository } from "@/token/domain/interfaces";
import { RefreshTokenRepository } from "@/token/infra/repositories/prisma";
import { InMemoryUserRepository } from "./domain/test/in-memory";

@Module({
  providers: [
    RegisterUserUseCase,
    UserRepository,
    GetUserUseCase,
    SoftDeleteUserUseCase,
    InMemoryUserRepository,
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
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
