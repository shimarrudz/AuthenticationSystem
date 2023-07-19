import { UserRepository } from "@/users/infra/repositories";

import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user_id: string): Promise<User> {
        return this.userRepository.getUserById(user_id)
    }
}