import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from 'src/shared/infra/http/tokens-controller/token-controller';
import { Login } from './use-cases/login/login';
import { RefreshTokenRepository } from './infra/repositories/prisma';
import { Logout } from './use-cases/logout/logout';
import { Refresh } from './use-cases/refresh-token/refresh-token';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    Login,
    RefreshTokenRepository,
    Logout,
    Refresh,
  ],
})
export class AuthModule {}
