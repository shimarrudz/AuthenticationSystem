import { PrismaClient } from '@prisma/client';
import { IRegisterUser } from 'src/users/interfaces';
import bcrypt from 'bcrypt';

export default class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: IRegisterUser): Promise<void> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    await this.prisma.user.create({
      data: {
        ...data,
        password_hash: passwordHash,
        created_at: new Date(),
      },
    });
  }

  async findByEmail(email: string): Promise<IRegisterUser | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? { ...user, password: user.password_hash, createdAt: user.created_at } : null;
  }
}
