import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from '@prisma/client';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  user: User;

  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  @IsDate()
  expiresAt: number;
}
