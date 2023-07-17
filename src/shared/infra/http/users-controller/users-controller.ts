import { Controller, Post, Get, Param, Body } from '@nestjs/common';

import { GetUserUseCase } from 'src/users/use-cases/get_user/get-user';
import { GetUserDto } from 'src/users/dto/get-user-dto';
import { User } from 'src/users/interfaces/user';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { IRegisterUser } from 'src/users/interfaces';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase
    ) {}

  @Post('signup')
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

  @Get(':id')
  async getUser(@Param('id') user_id: string): Promise<User> {
    return this.getUserUseCase.execute(user_id)
  }
}
