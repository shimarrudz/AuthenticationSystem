import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsStrongPassword, IsDate } from 'class-validator'
import { IsCustomEmail, IsCustomPassword } from '../utils';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        example: "Victor Shimada",
        description: "Name for register user on database",
        type: "string",
        required: true,
      })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsCustomEmail()
    @ApiProperty({
        example: "vic.shima.vss@gmail.com",
        description: "E-mail for register user on database",
        type: "string",
        required: true,
      })
    email: string;

    @IsCustomPassword()
    @IsStrongPassword()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(32)
    @ApiProperty({
        example: "Password@1234",
        description: "Password to be hashed in the future",
        type: "string",
        required: true,
      })
    password: string; 

    password_hash: string;
    
    @IsDate()
    createdAt: Date;
}