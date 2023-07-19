import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"

import { UserRepository } from "@/users/infra/repositories";
import { UserDto } from "../../dto";

@Injectable()
export class RegisterUserUseCase {
    constructor(private readonly userRepository: UserRepository){}
    async execute(data: UserDto): Promise<void> {
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