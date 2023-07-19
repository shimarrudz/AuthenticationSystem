import { Prisma, User } from "@prisma/client";

export interface IUserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  getUserById(user_id: string): Promise<User>;
  softDeleteUser(user_id: string): Promise<void>;
}
