import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { IUserRepository } from '@/users/domain/interfaces';
import { UserDto } from '@/users/domain/dto';
import { User } from '@prisma/client';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create(data: UserDto): Promise<User> {
    const { name, email, password } = data;
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: User = {
      id,
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
