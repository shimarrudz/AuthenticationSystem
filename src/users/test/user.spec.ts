/* import { RegisterUserUseCase } from "../use-cases/register-user/register-user";
import { InMemoryUserRepository } from "./in-memory/in-memory-users-repository";
import UserRepository from "../infra/repositories/user-repository";
import { IRegisterUser } from "../interfaces";

describe('Register User Use Case', () => {
    let registerUserUseCase: RegisterUserUseCase;
    let userRepository: UserRepository;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        registerUserUseCase = new RegisterUserUseCase(userRepository);
    });

    it('should be able to register a new user', async () => {
        const userData: IRegisterUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password',
            password_hash: '',
            createdAt: new Date(),
        };

        await registerUserUseCase.execute(userData);

        const user = await userRepository.findByEmail(userData.email);

        expect(user).toBeDefined();
        expect(user!.name).toBe(userData.name);
        expect(user!.email).toBe(userData.email);
    });
});
 */