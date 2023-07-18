import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { GetUserUseCase } from 'src/users/use-cases/get-user/get-user';
import { User } from 'src/users/interfaces/user';
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { IRegisterUser } from 'src/users/interfaces';
import { SoftDeleteUserUseCase } from 'src/users/use-cases/soft-delete/soft-delete';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly softDeleteUseCase: SoftDeleteUserUseCase
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
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') user_id: string): Promise<User> {
    return this.getUserUseCase.execute(user_id)
  }

  @Delete(':id')
  async deleteUser(@Param('id') user_id: string): Promise<{ message: string }> {
    await this.softDeleteUseCase.execute(user_id);
    return { message: 'User soft deleted successfully' };
  }
}

