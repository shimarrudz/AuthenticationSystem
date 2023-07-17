import { GetUserUseCase } from 'src/users/use-cases/get_user/get-user';
import { User } from 'src/users/interfaces/user';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
export declare class UsersController {
    private readonly registerUserUseCase;
    private readonly getUserUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, getUserUseCase: GetUserUseCase);
    create(createUserDto: CreateUserDto): Promise<any>;
    getUser(user_id: string): Promise<User>;
}
