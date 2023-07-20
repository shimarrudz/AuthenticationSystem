import { IsNotEmpty, IsUUID } from "class-validator"

export class GetUserDto {

    @IsNotEmpty()
    @IsUUID()
    user_id: string
}