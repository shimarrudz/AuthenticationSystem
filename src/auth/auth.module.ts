import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/shared/infra/http/tokens-controller/token-controller";
import { Login } from "./use-cases/login/login";
import { RefreshTokenRepository } from "./infra/repositories/prisma/refresh-token-repository";
import { RevokedTokenRepository } from "./infra/repositories/prisma/revoked-token-repository";

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    Login,
    RefreshTokenRepository,
    RevokedTokenRepository,
  ],
})
export class AuthModule {}
