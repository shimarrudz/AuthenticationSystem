import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

import { IRegisterUser } from "src/users/interfaces";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";

@Injectable()
export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserRepository){}
    async execute(data: IRegisterUser): Promise<void> {
        const { name, email, password } = data;

        const password_hash = await bcrypt.hash(password, 10);
    
        await this.userRepository.create({
            name,
            email,
            password,
            password_hash,
            createdAt: new Date(),
        });
        
    }
}