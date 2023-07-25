import * as bcrypt from "bcrypt";
import { IUserEntity } from "test-e2e/dto/register-user-dto";
import { IUserDto } from "test-e2e/dto/user-dto";
import { IUserRepository } from "../../interfaces";

export class InMemoryUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  async create(data: IUserDto): Promise<IUserEntity | null> {
    const existingUser = this.users.find((user) => user.email === data.email);
    if (existingUser) {
      throw new Error("E-mail already in use");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser: IUserEntity = {
      id: Math.random().toString(),
      name: data.name,
      email: data.email,
      password_hash: passwordHash,
      created_at: new Date(),
      deleted: false,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<IUserEntity | null> {
    const user = this.users.find((user) => user.email === email && !user.deleted);
    return user || null;
  }

  async getUserById(id: string): Promise<IUserEntity | null> {
    const user = this.users.find((user) => user.id === id && !user.deleted);
    return user || null;
  }

  async softDeleteUser(id: string): Promise<void> {
    const user = this.users.find((user) => user.id === id && !user.deleted);
    if (user) {
      user.deleted = true;
    }
  }
}
