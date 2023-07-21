import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { InMemoryUserRepository } from "@/users/domain/test/in-memory";
import { UserDto } from "@/users/domain/dto";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
  });

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should register a new user", async () => {
    const createUserDto: UserDto = {
      name: "Victor Shimada",
      email: "jdee@gmsssail.com",
      password: "Password@1234",
      password_hash: '',
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
