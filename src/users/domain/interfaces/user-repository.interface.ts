import { User, PrismaClient } from "@prisma/client";
import { UserDto } from "@/users/domain/dto";

export abstract class IUserRepository {
  abstract create(data: UserDto): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract getUserById(id: string): Promise<User | null>;
  abstract softDeleteUser(id: string): Promise<void>;
}
