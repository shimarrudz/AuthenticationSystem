import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/guards';
import { RegisterUserDto } from '@/users/dto';
import { IRegisterUser, User } from '@/users/interfaces';
import { RegisterUserUseCase, GetUserUseCase, SoftDeleteUserUseCase } from '@/users/use-cases';

@Controller('auth')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly softDeleteUseCase: SoftDeleteUserUseCase
    ) {}

  @Post('signup')
  async create(@Body() createUserDto: RegisterUserDto): Promise<any> {
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') user_id: string): Promise<{ message: string }> {
    await this.softDeleteUseCase.execute(user_id);
    return { message: 'User soft deleted successfully' };
  }
}

