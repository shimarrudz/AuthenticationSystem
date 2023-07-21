import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

import { UsersModule } from "@/users/users.module";
import { InMemoryUserRepository } from "@/users/domain/test/in-memory";
import { UserDto } from "@/users/domain/dto";
import { IUserRepository } from "@/users/domain/interfaces";

describe("Users Controller e2e", () => {
  let app: INestApplication;
  let inMemoryUserRepository: InMemoryUserRepository;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(IUserRepository)
      .useClass(InMemoryUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    inMemoryUserRepository = moduleFixture.get(InMemoryUserRepository);
  });

  beforeEach(async () => {
    const loginDto = { email: "seu-email", password: "sua-senha" };
    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send(loginDto);

    token = loginResponse.body.access_token;

  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to register a new user", async () => {
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

  describe("Get user route", () => {
    it("should be able to get an user by ID", async () => {
      const createUserDto: UserDto = {
        name: "John Doe",
        email: "johndoe@example.com",
        password: "My@password123",
        password_hash: "",
        createdAt: new Date(),
      };

      const createdUser = await inMemoryUserRepository.create(createUserDto);

      const getUserResponse = await request(app.getHttpServer())
        .get(`/users/list/${createdUser.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(getUserResponse.status).toBe(HttpStatus.OK);
      expect(getUserResponse.body).toEqual({
        id: createdUser.id,
        name: "John Doe",
        email: "johndoe@example.com",
      });
    });
  });
});
