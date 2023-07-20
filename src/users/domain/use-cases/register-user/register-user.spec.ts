import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InMemoryUserRepository } from '../../test/in-memory';
import { RegisterUserUseCase } from './register-user';
import * as bcrypt from 'bcrypt'

import { UserDto } from '@/users/domain/dto';
import { IUserRepository } from '../../interfaces'; // Importe a interface IUserRepository

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userRepository: IUserRepository; // Utilize a interface IUserRepository aqui

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
  });

  it('should create a new user', async () => {
    // Dados do usuário
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
      password_hash: '', // Adicione o password_hash com um valor de exemplo vazio
      createdAt: new Date(), // Adicione createdAt com um valor de data de exemplo
    };
  
    // Configuração do mock do userRepository.findByEmail para simular que o usuário não existe
    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
  
    // Configuração do mock do bcrypt.hash para retornar o hash da senha
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
  
    // Chamada do caso de uso
    await expect(registerUserUseCase.execute(userData)).resolves.toBeUndefined();
  
    // Verificações
    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining(userData));
  });

  it('should throw ConflictException if user already exists', async () => {
    // Test case for user registration with existing email
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
      password_hash: '', // No need for password_hash in this case since it's handled by the repository
      createdAt: new Date(),
    };

    userRepository.findByEmail = jest.fn().mockResolvedValue(userData); // User already exists in the repository

    await expect(registerUserUseCase.execute(userData)).rejects.toThrow(ConflictException);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw InternalServerErrorException if userRepository.create throws an error', async () => {
    // Test case for handling repository create error
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
      password_hash: '', // No need for password_hash in this case since it's handled by the repository
      createdAt: new Date(),
    };

    userRepository.findByEmail = jest.fn().mockResolvedValue(null);
    userRepository.create = jest.fn().mockRejectedValue(new Error('Database error')); // Simulate repository create error

    await expect(registerUserUseCase.execute(userData)).rejects.toThrow(InternalServerErrorException);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(userRepository.create).toHaveBeenCalledWith(userData);
  });
});





