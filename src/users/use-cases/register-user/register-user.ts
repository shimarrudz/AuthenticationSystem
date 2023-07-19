import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

import { UserRepository } from "@/users/infra/repositories";
import { IRegisterUser } from "@/users/interfaces";

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