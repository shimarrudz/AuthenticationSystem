import { Module } from "@nestjs/common";

import { RegisterUserUseCase } from "./use-cases/register-user/register-user";
import { UsersController } from "src/shared/infra/http/users-controller/users-controller";
import { UserRepository } from "./infra/repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "./use-cases/get_user/get-user";

@Module({
  providers: [RegisterUserUseCase, UserRepository, GetUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
