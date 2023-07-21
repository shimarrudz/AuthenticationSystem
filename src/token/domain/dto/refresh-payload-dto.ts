import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class RefreshPayloadDto {

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({
      example: "290b6435-13fc-4f12-8550-522ed28134fb",
      description: "User id for refresh payload",
      type: "string",
      required: true,
    })
    sub: string;
}