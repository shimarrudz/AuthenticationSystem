import { IsEmail, IsNotEmpty } from "class-validator"

export class GetUserDto {

    @IsNotEmpty()
    @IsEmail()
    user_id: string
}