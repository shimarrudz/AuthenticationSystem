import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
export declare class UsersController {
    private readonly registerUserUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase);
    create(createUserDto: CreateUserDto): Promise<any>;
}
