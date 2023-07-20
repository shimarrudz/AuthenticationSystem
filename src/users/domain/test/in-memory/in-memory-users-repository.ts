import * as bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";
import { UserDto } from "@/users/domain/dto";
import { IUserRepository } from "../../interfaces";

export class InMemoryUserRepository implements IUserRepository {
  prisma: PrismaClient;
  users: User[];

  constructor() {
    this.prisma = new PrismaClient();
    this.users = [];
  }

  async create(data: UserDto): Promise<User> {
    const { name, email, password } = data;
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: Math.random().toString(), // You can generate a unique ID here
      name,
      email,
      password_hash: passwordHash,
      created_at: new Date(),
      deleted: false,
    };

    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email && !user.deleted);
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
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
