import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException, NotFoundException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import { Refresh } from "./refresh-token";
import { IRefreshTokenRepository } from "../../interfaces";
import { RefreshPayloadTokenDto } from "../../interfaces";
import { InMemoryRefreshToken } from "../../test/in-memory/in-memory-user-repository";

describe("Refresh", () => {
  let refreshUseCase: Refresh;
  let jwtService: JwtService;
  let refreshTokenRepository: IRefreshTokenRepository;

  beforeEach(() => {
    refreshTokenRepository = new InMemoryRefreshToken();
    refreshUseCase = new (jwtService, refreshTokenRepository);

    jwtService = {
      sign: jest.fn(),
    } as any;
  });

  describe("Success Test", () => {
    it("should refresh token and return a new access token", async () => {
        const refreshToken = "QWNDsakj314j32oirjsdadsa2ij";

        const fakeUser = {
            id: "123456",
            email: "JohnDoe@gmail.com",
        };

        jest.spyOn(refreshTokenRepository, "findRefreshToken").mockResolvedValue({
            token: refreshToken,
        } as any);

        const newAccessToken = "QWNDsakj314j3dsaoijd90dsa";
        (jwtService.sign as jest.Mock).mockReturnValue(newAccessToken);

        const result: RefreshPayloadTokenDto = await refreshUseCase.execute(refreshToken);

        expect(result).toEqual({
            accessToken: newAccessToken,
        });

        expect(refreshTokenRepository.findRefreshToken).toBeCalledWith(refreshToken);

        expect(jwtService.sign).toHaveBeenCalledWith(
            { sub: fakeUser.id, email: fakeUser.email },
            { expiresIn: '5m' },
        );
    });
  });
});
