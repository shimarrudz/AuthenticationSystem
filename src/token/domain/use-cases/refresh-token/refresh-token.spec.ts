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
      jwtService = new JwtService({
        secret: process.env.JWT_SECRET,
      });
      refreshTokenRepository = new InMemoryRefreshToken();
      refreshUseCase = new Refresh(jwtService, refreshTokenRepository);
    });
  
    describe("Success Test", () => {
      it("should refresh token and return a new access token", async () => {
        const refreshToken = "QWNDsakj314j32oirjsdadsa2ij";
  
        const fakeUser = {
          id: "123456",
          email: "JohnDoe@gmail.com",
        };
  
        // Configurando o mock para retornar o token de refresh durante o teste
        jest
          .spyOn(refreshTokenRepository, "findRefreshToken")
          .mockResolvedValue({ token: refreshToken } as any);
  
        const newAccessToken = "QWNDsakj314j3dsaoijd90dsa";
        jest.spyOn(jwtService, "sign").mockReturnValue(newAccessToken);
  
        const result: RefreshPayloadTokenDto = await refreshUseCase.execute(
          refreshToken
        );
  
        expect(result).toEqual({
          accessToken: newAccessToken,
        });
  
        expect(refreshTokenRepository.findRefreshToken).toBeCalledWith(
          refreshToken
        );
  
        expect(jwtService.sign).toHaveBeenCalledWith(
          { sub: fakeUser.id, email: fakeUser.email },
          { expiresIn: "5m" }
        );
      });
    });
  });