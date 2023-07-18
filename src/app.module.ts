import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TokenModule } from './token/token.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, TokenModule],
})
export class AppModule {}
