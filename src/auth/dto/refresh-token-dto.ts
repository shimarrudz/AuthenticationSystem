import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsNotEmpty()
    @IsString()
    user:string;

    @IsNotEmpty()
    @IsDate()
    expiresAt: number;
}