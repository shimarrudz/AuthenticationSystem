import { UserDto } from "@/users/domain/dto";

export interface ITRegisterUserDto extends Pick<UserDto, "name" | "email" | "password"> {}