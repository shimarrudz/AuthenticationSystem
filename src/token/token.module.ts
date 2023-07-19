import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { Refresh } from '@/token/domain/use-cases/refresh-token/refresh-token';
import { Login } from '@/auth/domain/use-case';
import { TokenController } from '@/shared/infra/http';
import { LoginRepository } from '@/auth/infra/repositories/prisma';
import { RefreshTokenRepository } from './infra/repositories/prisma';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [TokenController],
  providers: [
    Login,
    RefreshTokenRepository,
    Refresh,
    LoginRepository
  ],
})
export class TokenModule {}
