import { ConflictException } from "@nestjs/common";

import { UserDto } from "../../dto";
import { RegisterUserUseCase } from "./register-user";
import { HttpExceptionConstants } from "@/shared/constants";
import { InMemoryUserRepository } from "../../test/in-memory";

describe("Register User", () => {
  let registerUserUseCase: RegisterUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    registerUserUseCase = new RegisterUserUseCase(inMemoryUserRepository);
  });

  describe("Success Test", () => {
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

      await expect(
        registerUserUseCase.execute(userData)
      ).resolves.not.toThrow();
    });
  });

  describe("Fail Test", () => {
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

      const promise = registerUserUseCase.execute(existingUser);
      await expect(promise).rejects.toMatchObject({
        constructor: ConflictException,
        message: HttpExceptionConstants.USER_ALREADY_EXISTS.message,
      });
    });

    it("should be able to throw FAILED_TO_CREATE_USER when an error occurs during user creation", async () => {
      const userData: UserDto = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "My@password123",
        password_hash: "",
        createdAt: new Date(),
      };

      // Simule um erro durante a criação do usuário
      jest.spyOn(inMemoryUserRepository, "findByEmail").mockResolvedValue(null);
      jest
        .spyOn(inMemoryUserRepository, "create")
        .mockRejectedValue(new Error("Failed to create user"));

      const promise = registerUserUseCase.execute(userData);
      await expect(promise).rejects.toMatchObject({
        message: HttpExceptionConstants.FAILED_TO_CREATE_USER.message,
      });
    });
  });
});
