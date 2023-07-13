import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './use-cases/register-user/register-user';
import { UsersController } from 'src/shared/infra/http/users-controller/users-controller';
import UserRepository from './infra/repositories/prisma/prisma-user-repository';

@Module({
  providers: [RegisterUserUseCase, UserRepository],
  controllers: [UsersController],
})
export class UsersModule {}
