import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsUUID, MaxLength, MinLength } from "class-validator";
import { IsCustomEmail } from "../utils";

export class UserDeletedDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: "290b6435-13fc-4f12-8550-522ed28134fb",
    description: "User id validation for soft delete",
    type: "string",
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    example: "Victor Shimada Serete",
    description: "Name validation for soft delet",
    type: "string",
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsCustomEmail()
  @ApiProperty({
    example: "vic.shima@gmail.com",
    description: "E-mail for soft delet request",
    type: "string",
    required: true,
  })
  email: string;

  @IsBoolean()
  @ApiProperty({
    example: "false",
    description: "Boolean state for validate if user exists",
    type: "boolean",
    required: true,
  })
  deleted: boolean;
}
