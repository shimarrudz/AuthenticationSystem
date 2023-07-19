import { Controller, Post, Get, Delete, Param, Body, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@/auth/domain/guards';
import { RegisterUserDto, UserDto, UserDeletedDto } from '@/users/domain/dto';
import { RegisterUserUseCase, GetUserUseCase, SoftDeleteUserUseCase } from '@/users/domain/use-cases';

@Controller('users')
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly softDeleteUseCase: SoftDeleteUserUseCase
    ) {}

  @Post('signup')
  async create(@Body() createUserDto: RegisterUserDto): Promise<any> {
    const user: UserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      password_hash: '',
      createdAt: new Date(),
    };
    await this.registerUserUseCase.execute(user);
    return { message: 'User created successfully' };
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') user_id: string): Promise<UserDeletedDto> {
    return this.getUserUseCase.execute(user_id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') user_id: string): Promise<{ message: string }> {
    await this.softDeleteUseCase.execute(user_id);
    return { message: 'User soft deleted successfully' };
  }
}

