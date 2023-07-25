import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class GetUserDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    example: "290b6435-13fc-4f12-8550-522ed28134fb",
    description: "User id to validate get request",
    type: "string",
    required: true,
  })
  user_id: string;
}
