import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException, NotFoundException } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

import { Refresh } from "./refresh-token";
import { IRefreshTokenRepository } from "../../interfaces";
import { RefreshPayloadTokenDto } from "../../interfaces";
import { InMemoryRefreshToken } from "../../test/in-memory/in-memory-user-repository";

describe("Refresh", () => {
    let refreshUseCase: Refresh;
    let jwtService: JwtService;
    let inMemoryUserRepository: InMemoryRefreshToken;

    beforeEach(() => {
        inMemoryUserRepository = new InMemoryRefreshToken();

        jwtService = {
            sign: jest.fn(),
        } as any;

    })
})