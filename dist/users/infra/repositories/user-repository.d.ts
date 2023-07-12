import { IRegisterUser } from 'src/users/interfaces';
export default class UserRepository {
    private prisma;
    constructor();
    create(data: IRegisterUser): Promise<void>;
    findByEmail(email: string): Promise<IRegisterUser | null>;
}
