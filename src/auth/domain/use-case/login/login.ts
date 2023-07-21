import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { JwtPayloadDto } from "../../dto";
import { UserTokenDto, RefreshPayloadDto } from "@/token/domain/dto";
import { HttpExceptionConstants } from "@/shared/constants";
import { ILoginRepository } from "../../interfaces/login-repository";

@Injectable()
export class Login {
  constructor(
    private jwtService: JwtService,
    private refreshTokenRepository: ILoginRepository
  ) {}

  async execute(email: string, password: string): Promise<UserTokenDto> {
    const user = await this.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        HttpExceptionConstants.INVALID_CREDENTIALS.message
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new UnauthorizedException(
        HttpExceptionConstants.INVALID_CREDENTIALS.message
      );
    }

    const accessToken = this.generateAccessToken(user.id, user.email);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  private generateAccessToken(userId: string, email: string): string {
    const payload: JwtPayloadDto = {
      sub: userId,
      email,
    };

    return this.jwtService.sign(payload, {
      expiresIn: "5m",
    });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const payload: RefreshPayloadDto = {
      sub: userId,
    };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "3m",
    });

    await this.refreshTokenRepository.createRefreshToken(
      refreshToken,
      userId,
      new Date(Date.now() + 3 * 60 * 1000)
    );

    return refreshToken;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return this.refreshTokenRepository.findUserByEmail(email);
  }
}
