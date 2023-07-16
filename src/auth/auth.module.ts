import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/shared/infra/http/tokens-controller/token-controller';
import { Login } from './use-cases/login/login';
import { RefreshTokenRepository } from './infra/repositories/prisma';

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
  ],
})
export class AuthModule {}
