import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { User } from '@prisma/client';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsDate()
  expires_at: number;
}
