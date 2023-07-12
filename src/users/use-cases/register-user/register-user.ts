import { Injectable } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


import { IRegisterUser } from "src/users/interfaces";

@Injectable()
export class RegisterUserUseCase {
    async execute(data: IRegisterUser): Promise<void> {
        const { name, email, password } = data;

        const prisma = new PrismaClient();

        const password_hash = await bcrypt.hash(password, 10);
    
        await prisma.user.create({
            data: {
                name,
                email,
                password_hash,
            },
        });
    
        /* await prisma.$disconnect(); */
    }
}