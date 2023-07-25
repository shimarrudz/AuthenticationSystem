import { IsCustomEmail } from "@/users/domain/utils";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class UserFromJwtDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    example: "290b6435-13fc-4f12-8550-522ed28134fb",
    description: "User id for user JWT",
    type: "string",
    required: true,
  })
  id: string;

  @IsNotEmpty()
  @IsEmail()
  @IsCustomEmail()
  @ApiProperty({
    example: "vic.shima@gmail.com",
    description: "Email for register user request",
    type: "string",
    required: true,
  })
  email: string;
}
