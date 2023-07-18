import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";

@Injectable()
export class SoftDeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user_id: string): Promise<void> {
        const user = await this.userRepository.getUserById(user_id);
        if (!user) {
            throw new NotFoundException('User not found')
        }
        await this.userRepository.softDeleteUser(user_id);
    }
  }