import { UserDto } from "../../dto";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";

export class InMemoryUserRepository {
  private userRepository: UserRepository;
  private users: UserDto[] = [];

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(data: UserDto): Promise<void> {
    this.users.push(data);
    await this.userRepository.create(data);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = this.users.find((u) => u.email === email);
    return user || null;
  }

}