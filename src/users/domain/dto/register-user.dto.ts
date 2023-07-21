import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsStrongPassword,
} from "class-validator";
import { IsCustomEmail, IsCustomPassword } from "../utils";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    example: "Victor Shimada",
    description: "Name for register user request",
    type: "string",
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsCustomEmail()
  @ApiProperty({
    example: "vic.shima@gmail.com",
    description: "E-mail for register user request",
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
    description: "Password for register user request",
    type: "string",
    required: true,
  })
  password: string;
}
