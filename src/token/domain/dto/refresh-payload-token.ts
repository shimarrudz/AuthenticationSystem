import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RefreshPayloadTokenDto {
  @IsNotEmpty()
  @MinLength(140)
  @MaxLength(200)
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDBiNDExYS0zODI0LTQwNjMtOGU4MS1kN2IwNjdhMDI4ZDIiLCJlbWFpbCI6ImVkdUBnbWFpbC5jb3NtIiwiaWF0IjoxNjg5OTE0Mzc1LCJleHAiOjE2ODk5MTQ2NzV9.QSc2omg0194pR5mENSlVHs8FLRotRnbl0GyeWMhnPcg",
    description: "Refresh token for payload data",
    type: "string",
    required: true,
  })
  accessToken: string;
}
