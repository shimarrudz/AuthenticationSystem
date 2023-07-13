import { IRegisterUser } from "src/users/interfaces";
import UserRepository from "src/users/infra/repositories/prisma/prisma-user-repository";
export declare class RegisterUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(data: IRegisterUser): Promise<void>;
}
