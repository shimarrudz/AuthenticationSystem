import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './use-cases/register-user/register-user';
import { UsersController } from 'src/shared/infra/http/users-controller/users-controller';

@Module({
  providers: [RegisterUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
