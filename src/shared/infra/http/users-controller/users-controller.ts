import { Controller, Post, Body } from '@nestjs/common';
import { Request, Response } from "express";
import { validate } from "class-validator";

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { IRegisterUser } from "src/users/interfaces";

@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: IRegisterUser = {
      id: '',
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      password_hash: '',
      createdAt: new Date(),
    };

    try {
      await this.registerUserUseCase.execute(user);
      return { message: 'User created successfully' };
    } catch (error) {
      return { error: 'Internal server error' };
    }
  }
}
/* 
export class UsersController {
    private registerUserUseCase: RegisterUserUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserDto = new CreateUserDto();
        createUserDto.name = name;
        createUserDto.email = email;
        createUserDto.password = password;

        const errors = await validate(createUserDto);

        if (errors.length > 0) {
            return response.status(400).json({ errors });
        }

        const user: IRegisterUser = {
            id: '',
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            password_hash: '',
            createdAt: new Date(),
        };

        try {
            await this.registerUserUseCase.execute(user);

            return response.status(201).json({ message: 'User created successfully!' });
        } catch (error) {
            return response.status(500).json({ error: 'Internal server error' });
        }
    }
}
 */