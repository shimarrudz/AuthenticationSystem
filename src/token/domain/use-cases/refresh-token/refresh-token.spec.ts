import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException, NotFoundException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

import { Refresh } from "@/token/domain/use-cases";
import { InMemoryRefreshToken } from "@/token/domain/test/in-memory/in-memory-token-repository";

describe("Refresh", () => {
  let refreshUseCase: Refresh;
  let jwtService: JwtService;
  let inMemoryRefreshToken: InMemoryRefreshToken;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: process.env.JWT_SECRET, // Use your actual JWT secret here
    });
    inMemoryRefreshToken = new InMemoryRefreshToken();
    refreshUseCase = new Refresh(jwtService, inMemoryRefreshToken);
  });

  describe("Failure Test", () => {
    it("should throw NotFoundException when refresh token is not found", async () => {
      const refreshToken = "invalidToken";

      jest
        .spyOn(inMemoryRefreshToken, "findRefreshToken")
        .mockResolvedValue(null);

      await expect(refreshUseCase.execute(refreshToken)).rejects.toThrow(
        NotFoundException
      );
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(
        refreshToken
      );
    });

    it("should throw UnauthorizedException when refresh token is invalid", async () => {
      const refreshToken = "invalidToken";

      jest
        .spyOn(inMemoryRefreshToken, "findRefreshToken")
        .mockResolvedValue({} as any);
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error();
      });

      await expect(refreshUseCase.execute(refreshToken)).rejects.toThrow(
        UnauthorizedException
      );
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(
        refreshToken
      );
      expect(jwt.verify).toHaveBeenCalledWith(
        refreshToken,
        process.env.JWT_SECRET
      );
    });
  });
});
