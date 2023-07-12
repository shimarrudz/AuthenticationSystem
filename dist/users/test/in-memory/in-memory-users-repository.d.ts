import { IRegisterUser } from "src/users/interfaces";
import UserRepository from "src/users/infra/repositories/user-repository";
export declare class InMemoryUserRepository {
    private userRepository;
    private users;
    constructor(userRepository: UserRepository);
    create(data: IRegisterUser): Promise<void>;
    findByEmail(email: string): Promise<IRegisterUser>;
    findAll(): Promise<IRegisterUser[]>;
}
