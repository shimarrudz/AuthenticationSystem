import { Module } from '@nestjs/common';
import { LoginUseCase } from './use-cases/login/login-use-case';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/shared/infra/http/tokens-controller/token-controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Substitua pela sua chave secreta real
      signOptions: { expiresIn: '15m' }, // Defina o tempo de expiração do token de acesso
    }),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
