import { GetUserUseCase } from 'src/users/use-cases/get-user/get-user';
import { User } from 'src/users/interfaces/user';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { SoftDeleteUserUseCase } from 'src/users/use-cases/soft-delete/soft-delete';
export declare class UsersController {
    private readonly registerUserUseCase;
    private readonly getUserUseCase;
    private readonly softDeleteUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, getUserUseCase: GetUserUseCase, softDeleteUseCase: SoftDeleteUserUseCase);
    create(createUserDto: CreateUserDto): Promise<any>;
    getUser(user_id: string): Promise<User>;
    deleteUser(user_id: string): Promise<{
        message: string;
    }>;
}
