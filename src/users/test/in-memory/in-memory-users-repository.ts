import { IRegisterUser } from "src/users/interfaces";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";

export class InMemoryUserRepository {
  private userRepository: UserRepository;
  private users: IRegisterUser[] = [];

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(data: IRegisterUser): Promise<void> {
    this.users.push(data);
    await this.userRepository.create(data);
  }

  async findByEmail(email: string): Promise<IRegisterUser> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

  async findAll(): Promise<IRegisterUser[]> {
    return this.users;
  }
}
