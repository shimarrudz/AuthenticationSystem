import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { UsersModule } from "@/users/users.module"; // Importe somente o módulo de usuários
import { InMemoryUserRepository } from "@/users/domain/test/in-memory";
import { UserDto } from "@/users/domain/dto";
import { IUserRepository } from "@/users/domain/interfaces";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule], // Use somente o módulo de usuários no teste
    })
      .overrideProvider(IUserRepository) // Sobrescreva o provedor UserRepository com InMemoryUserRepository
      .useClass(InMemoryUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    inMemoryUserRepository = moduleFixture.get(InMemoryUserRepository); // Obtenha a instância de InMemoryUserRepository do contêiner de injeção de dependência
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const createUserDto: UserDto = {
      name: "Victor Shimada",
      email: "jdse@gmail.com",
      password: "Password@1234",
      password_hash: "",
      createdAt: new Date(),
    };

    const response = await request(app.getHttpServer())
      .post("/users/signup")
      .send(createUserDto);

    expect(response.status).toBe(HttpStatus.CREATED);

    const createdUser = await inMemoryUserRepository.create(createUserDto);
    expect(createdUser).toBeDefined();
    expect(response.body).toEqual({ message: "User created successfully" });
  });
});