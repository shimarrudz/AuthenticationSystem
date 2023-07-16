import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenRepository } from "src/auth/infra/repositories/prisma";
import { IUserToken, IJwtPayload, IUserFromJwt } from "src/auth/interfaces";

@Injectable()
export class Refresh {
    constructor (
        private jwtService: JwtService,
        private refreshTokenRepository: RefreshTokenRepository,
    ) {}
}