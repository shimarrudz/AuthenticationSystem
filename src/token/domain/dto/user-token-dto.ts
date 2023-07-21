import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UserTokenDto {
  @IsNotEmpty()
  @MinLength(140)
  @MaxLength(200)
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDBiNDExYS0zODI0LTQwNjMtOGU4MS1kN2IwNjdhMDI4ZDIiLCJlbWFpbCI6ImVkdUBnbWFpbC5jb3NtIiwiaWF0IjoxNjg5OTE0Mzc1LCJleHAiOjE2ODk5MTQ2NzV9.QSc2omg0194pR5mENSlVHs8FLRotRnbl0GyeWMhnPcg",
    description: "Access token that will be returned for user",
    type: "string",
    required: true,
  })
  accessToken: string;

  @IsNotEmpty()
  @MinLength(140)
  @MaxLength(200)
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDBiNDExYS0zODI0LTQwNjMtOGU4MS1kN2IwNjdhMDI4ZDIiLCJlbWFpbCI6ImVkdUBnbWFpbC5jb3NtIiwiaWF0IjoxNjg5OTE0Mzc1LCJleHAiOjE2ODk5MTQ2NzV9.QSc2omg0194pR5mENSlVHs8FLRotRnbl0GyeWMhnPcg",
    description: "Refresh token that will be returned for user",
    type: "string",
    required: true,
  })
  refreshToken: string;
}
