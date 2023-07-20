import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Refresh } from './refresh-token';
import { RefreshPayloadTokenDto } from '../../dto';
import { UserFromJwtDto } from '@/auth/domain/dto';
import * as jwt from 'jsonwebtoken';
import { HttpExceptionConstants } from '@/shared/constants';
import { InMemoryRefreshToken } from '../../test/in-memory/in-memory-user-repository';

describe('Refresh', () => {
  let refreshUseCase: Refresh;
  let jwtService: JwtService;
  let inMemoryRefreshToken: InMemoryRefreshToken;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
    inMemoryRefreshToken = new InMemoryRefreshToken(); // Assign the created instance here
    refreshUseCase = new Refresh(jwtService, inMemoryRefreshToken);
  });

  describe('Success Test', () => {
    it('should refresh the token and return a new access token', async () => {
      // Given a valid refreshToken
      const refreshToken = 'QWNDsakj314j32oirjsdadsa2ij';
  
      // And a fake user to return when searching for their ID
      const fakeUser: UserFromJwtDto = {
        id: '123456',
        email: 'JohnDoe@gmail.com',
      };
  
      // And the new accessToken generated after the refresh
      const newAccessToken = 'QWNDsakj314j3dsaoijd90dsa';
      jest.spyOn(jwtService, 'sign').mockReturnValue(newAccessToken);
  
      // And we set up the "findRefreshToken" and "findUserById" methods to return valid values
      jest
        .spyOn(inMemoryRefreshToken, 'findRefreshToken')
        .mockResolvedValue({ token: refreshToken } as any);
  
      jest
        .spyOn(inMemoryRefreshToken, 'findUserById')
        .mockResolvedValue(fakeUser);
  
      // When we execute the "Refresh" use case
      const result: RefreshPayloadTokenDto = await refreshUseCase.execute(refreshToken);
  
      // Then, we expect the result to be equal to the new accessToken generated
      expect(result).toEqual({
        accessToken: newAccessToken,
      });
  
      // And we expect the "findRefreshToken" and "findUserById" methods to be called correctly
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(refreshToken);
      expect(inMemoryRefreshToken.findUserById).toBeCalledWith(fakeUser.id);
  
      // And we expect the "sign" method of jwtService to be called with the correct arguments as well
      expect(jwtService.sign).toHaveBeenCalledWith(
        { sub: fakeUser.id, email: fakeUser.email },
        { expiresIn: '5m' }
      );
    });
  });
});

/*   describe('Failure Test', () => {
    it('should throw NotFoundException when refresh token is not found', async () => {
      const refreshToken = 'invalidToken';

      jest.spyOn(inMemoryRefreshToken, 'findRefreshToken').mockResolvedValue(null);

      await expect(refreshUseCase.execute(refreshToken)).rejects.toThrow(NotFoundException);
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(refreshToken);
    });

    it('should throw UnauthorizedException when refresh token is invalid', async () => {
      const refreshToken = 'invalidToken';

      jest.spyOn(inMemoryRefreshToken, 'findRefreshToken').mockResolvedValue({} as any);
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error();
      });

      await expect(refreshUseCase.execute(refreshToken)).rejects.toThrow(UnauthorizedException);
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(refreshToken);
      expect(jwt.verify).toHaveBeenCalledWith(refreshToken, process.env.JWT_SECRET);
    });

    it('should throw UnauthorizedException when user is not found for the decoded token', async () => {
      const refreshToken = 'QWNDsakj314j32oirjsdadsa2ij';

      jest.spyOn(inMemoryRefreshToken, 'findRefreshToken').mockResolvedValue({} as any);
      
      // Mock jwt.verify as asynchronous and return a resolved Promise
      jest.spyOn(jwt, 'verify').mockImplementation(() => Promise.resolve({ sub: '123456' }));

      jest.spyOn(inMemoryRefreshToken, 'findUserById').mockResolvedValue(null);

      await expect(refreshUseCase.execute(refreshToken)).rejects.toThrow(UnauthorizedException);
      expect(inMemoryRefreshToken.findRefreshToken).toBeCalledWith(refreshToken);
      expect(jwt.verify).toHaveBeenCalledWith(refreshToken, process.env.JWT_SECRET);
      expect(inMemoryRefreshToken.findUserById).toBeCalledWith('123456');
    });
  });
});
 */







/* import { JwtService } from "@nestjs/jwt";
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
  }); */