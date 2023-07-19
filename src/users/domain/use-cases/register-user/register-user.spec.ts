import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { InMemoryUserRepository } from '../../test/in-memory';
import { RegisterUserUseCase } from '@/users/domain/use-cases';
import { UserDto } from '@/users/domain/dto';

describe('RegisterUserUseCase', () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userRepository: InMemoryUserRepository;

beforeEach(() => {
  userRepository = new InMemoryUserRepository(); // Instancie o repositório in-memory nos testes
  registerUserUseCase = new RegisterUserUseCase(userRepository);
});

  it('should create a new user', async () => {
    // Dados do usuário
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
    };

    // Chamada do caso de uso
    await expect(registerUserUseCase.execute(userData)).resolves.toBeUndefined();

    // Verificações
    const user = await userRepository.findByEmail(userData.email);
    expect(user).toBeTruthy();
    expect(user?.name).toBe(userData.name);
    expect(user?.email).toBe(userData.email);

    // Verifica se a senha foi corretamente hasheada
    const passwordMatch = await bcrypt.compare(userData.password, user?.password_hash || '');
    expect(passwordMatch).toBe(true);
  });

  it('should throw ConflictException if user already exists', async () => {
    // Dados do usuário
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
    };

    // Cria o usuário manualmente
    await userRepository.create(userData);

    // Chamada do caso de uso e verificação da exceção
    await expect(registerUserUseCase.execute(userData)).rejects.toThrow();
  });

  it('should throw InternalServerErrorException if userRepository.create throws an error', async () => {
    // Dados do usuário
    const userData: UserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'mypassword',
    };

    // Mock do bcrypt.hash para simular um erro ao hashear a senha
    jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error('Bcrypt error'));

    // Chamada do caso de uso e verificação da exceção
    await expect(registerUserUseCase.execute(userData)).rejects.toThrow();
  });
});