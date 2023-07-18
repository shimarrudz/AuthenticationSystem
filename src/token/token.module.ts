import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenController } from 'src/shared/infra/http/tokens-controller/token-controller';
import { Login } from '../auth/use-case/login/login';
import { RefreshTokenRepository } from './infra/repositories/prisma';
import { Logout } from './use-cases/logout/logout';
import { Refresh } from './use-cases/refresh-token/refresh-token';
import { RevokedTokenRepository } from './infra/repositories/prisma';

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
    Logout,
    Refresh,
    RevokedTokenRepository,
  ],
  exports: [RevokedTokenRepository]
  
})
export class TokenModule {}
