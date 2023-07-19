import { Module } from "@nestjs/common";

import { UsersController } from "@/shared/infra/http";
import { UserRepository } from "./infra/repositories";
import { RegisterUserUseCase, GetUserUseCase, SoftDeleteUserUseCase } from "./domain/use-cases";


@Module({
  providers: [RegisterUserUseCase, UserRepository, GetUserUseCase, SoftDeleteUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
