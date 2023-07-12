import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'
import { SrvRecord } from 'dns';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}
