import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { InMemoryUserRepository } from "@/users/domain/test/in-memory";
import { RegisterUserDto, UserDto } from "@/users/domain/dto";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryUserRepository.users = []; // Limpar o array de usuários antes de cada teste
  });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    inMemoryUserRepository = new InMemoryUserRepository();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const createUserDto: RegisterUserDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "My@password123",
    };

    const response = await request(app.getHttpServer())
      .post("/users/signup")
      .send(createUserDto);
    expect(response.status).toBe(HttpStatus.CREATED);

    expect(response.body).toEqual({ message: "User created successfully" });
  });
});
