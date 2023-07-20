import { Test, TestingModule } from "@nestjs/testing";
import { RegisterUserUseCase } from "./register-user";
import { InMemoryUserRepository } from "../../test/in-memory";
import { HttpExceptionConstants } from "@/shared/constants";
import { ConflictException } from "@nestjs/common";
import { UserDto } from "../../dto";
import { IUserRepository } from "@/users/domain/interfaces/user-repository.interface";

describe("Register User", () => {
  let registerUserUseCase: RegisterUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        InMemoryUserRepository,
        {
          provide: IUserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    registerUserUseCase = module.get<RegisterUserUseCase>(RegisterUserUseCase);
    inMemoryUserRepository = module.get<InMemoryUserRepository>(
      InMemoryUserRepository
    );
  });

  it("should be able to register an user", async () => {
    const userData: UserDto = {
      name: "John Doe",
      email: "ERROR.com",
      password: "My@password123",
      password_hash: "",
      createdAt: new Date(),
    };

    jest.spyOn(inMemoryUserRepository, "findByEmail").mockResolvedValue(null);

    jest
      .spyOn(inMemoryUserRepository, "create")
      .mockResolvedValue(userData as any);

    await expect(registerUserUseCase.execute(userData)).resolves.not.toThrow();
  });

  it("should be able to throw ConflictException when trying to register a user with existing email", async () => {
    const existingUser: UserDto = {
      name: "Existing User",
      email: "existing@example.com",
      password: "My@password123",
      password_hash: "",
      createdAt: new Date(),
    };

    jest
      .spyOn(inMemoryUserRepository, "findByEmail")
      .mockResolvedValue(existingUser as any);

    await expect(
      registerUserUseCase.execute(existingUser)
    ).resolves.toBeUndefined();
    const promise = registerUserUseCase.execute(existingUser);
    await expect(promise).rejects.toMatchObject({
      constructor: ConflictException,
      message: HttpExceptionConstants.USER_ALREADY_EXISTS.message,
    });
  });
});
