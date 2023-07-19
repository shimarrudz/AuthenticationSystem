import { User } from '@prisma/client';
import { UserDto } from '../dto';

export interface IUserRepository {
  create(data: UserDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  softDeleteUser(id: string): Promise<void>;
}