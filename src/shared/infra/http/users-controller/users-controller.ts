import { Controller, Post, Body } from '@nestjs/common';

import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { IRegisterUser } from 'src/users/interfaces';

@Controller('auth/sign-up')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: IRegisterUser = {
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
      throw error;
    }
  }
}
