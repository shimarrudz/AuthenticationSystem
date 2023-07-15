import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../shared/infra/http/tokens-controller/token-controller';
import { UserRepository } from './infra/repositories/prisma/prisma-user-repository';
import { TokenRepository } from './infra/repositories/prisma/prisma-token-repository';
import { LoginUseCase } from './use-cases/login/login-use-case';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      // ARRUMAR ISSO*******************************
      /******************************************
      ******************************** */
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    UserRepository,
    TokenRepository,
    JwtStrategy,
  ],
})
export class AuthModule {}
