import { RegisterUserUseCase } from "./register-user";
import { UserRepository } from "src/users/infra/repositories/prisma/prisma-user-repository";
import { IRegisterUser } from "@/users/domain/interfaces";

describe("RegisterUserUseCase", () => {
  let registerUserUseCase: RegisterUserUseCase;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
  });

  afterEach(() => {
  });

  it("should be able to register a new user", async () => {
    const userData: IRegisterUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: "",
      password: "password123",
      createdAt: new Date(),
    };

    userRepository.create = jest
      .fn()
      .mockResolvedValueOnce({ id: "1", ...userData });

    await registerUserUseCase.execute(userData);

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userData.name,
        email: userData.email,
        password: expect.any(String),
        password_hash: expect.any(String),
      })
    );
  });
});
