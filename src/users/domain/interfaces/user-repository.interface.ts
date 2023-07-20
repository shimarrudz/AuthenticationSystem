import { User, PrismaClient } from '@prisma/client';
import { UserDto } from '@/users/domain/dto';

export interface IUserRepository {
  prisma: PrismaClient; // Adicione a propriedade prisma aqui
  create(data: UserDto): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  softDeleteUser(id: string): Promise<void>;
}
