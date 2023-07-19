import * as bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

import { IRegisterUser, IUserRepository } from "@/users/interfaces";



export class UserRepository implements IUserRepository {
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

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email} });
    return user;
  }

  async getUserById(id: string) : Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
        deleted: false,
      },
    });
    return user;
  }


  async softDeleteUser(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: id },
      data: { deleted: true },
    });
  }
}
