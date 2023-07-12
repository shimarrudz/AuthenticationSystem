import { IRegisterUser } from "src/users/interfaces";
export declare class RegisterUserUseCase {
    execute(data: IRegisterUser): Promise<void>;
}
