import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { Login, Refresh } from './use-cases';
import { TokenController } from '@/shared/infra/http';
import { LoginRepository } from '@/auth/infra/repositories/prisma';
import { RefreshTokenRepository, RevokedTokenRepository } from './infra/repositories/prisma';


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
    RevokedTokenRepository,
    LoginRepository
  ],
  exports: [RevokedTokenRepository]
  
})
export class TokenModule {}
