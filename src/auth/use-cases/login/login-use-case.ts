import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { LoginDto } from 'src/auth/dto/login-dto';
import { IUserRepository } from 'src/users/interfaces/user-repository.interface';
import { ITokenRepository } from 'src/auth/interfaces/token-repository.interface';
import { TokenPayload } from 'src/auth/interfaces/token-payload.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessTokenPayload: TokenPayload = { sub: user.id };
    const accessToken = this.jwtService.sign(accessTokenPayload);

    const refreshTokenPayload: TokenPayload = { sub: user.id };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, { expiresIn: '7d' });

    await this.tokenRepository.createToken(user.id, accessToken, refreshToken);

    return { accessToken, refreshToken };
  }
}
