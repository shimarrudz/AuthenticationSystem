import * as bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

import { IRegisterUser } from 'src/users/interfaces';
import { IUserRepository } from 'src/users/interfaces/user-repository';

export default class UserRepository implements IUserRepository{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: IRegisterUser) {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: passwordHash,
        created_at: new Date(),
      },
    });

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }
  
}
