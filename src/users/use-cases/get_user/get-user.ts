import { Injectable } from "@nestjs/common";

import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";
import { IUserRepository } from "src/users/interfaces/user-repository.interface";
import { User } from "src/users/interfaces/user";

@Injectable()
export class GetUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(user_id: string): Promise<User> {
        return this.userRepository.getUserById(user_id)
    }
}