import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsStrongPassword } from 'class-validator'
import { IsCustomEmail, IsCustomPassword } from '../utils';

export class RegisterUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsCustomEmail()
    email: string;

    @IsCustomPassword()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    password: string;
}
