import { Module } from "@nestjs/common";

import { RegisterUserUseCase } from "./use-cases/register-user/register-user";
import { UsersController } from "src/shared/infra/http/users-controller/users-controller";
import { UserRepository } from "./infra/repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "./use-cases/get-user/get-user";
import { SoftDeleteUserUseCase } from "./use-cases/soft-delete/soft-delete";
import { RevokedTokenRepository } from "src/token/infra/repositories/prisma";
import { IRegisterUser } from "./interfaces";

@Module({
  providers: [RegisterUserUseCase, UserRepository, GetUserUseCase, SoftDeleteUserUseCase, RevokedTokenRepository],
  controllers: [UsersController],
})
export class UsersModule {}
