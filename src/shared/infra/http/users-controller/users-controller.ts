import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { InMemoryUserRepository } from '@/users/domain/test/in-memory';
import { RegisterUserDto, UserDto } from '@/users/domain/dto';
import { RegisterUserUseCase } from '@/users/domain/use-cases';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let inMemoryUserRepository: InMemoryUserRepository;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository);

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(RegisterUserUseCase)
      .useValue(registerUserUseCase)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should register a new user', async () => {
    const createUserDto: RegisterUserDto = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'My@password123',
    };

    const response = await request(app.getHttpServer())
      .post('/users/signup')
      .send(createUserDto)
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({ message: 'User created successfully' });

    // Verifique se o usuário foi realmente registrado no repositório
    const registeredUser = await inMemoryUserRepository.findByEmail(createUserDto.email);
    expect(registeredUser).toBeDefined();
    expect(registeredUser?.name).toBe(createUserDto.name);
    expect(registeredUser?.email).toBe(createUserDto.email);
  });
});
