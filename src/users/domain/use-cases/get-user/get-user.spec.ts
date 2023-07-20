import { User } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";

import { GetUserUseCase } from "./get-user";
import { InMemoryUserRepository } from "../../test/in-memory";
import { HttpExceptionConstants } from "@/shared/constants";

describe("Get User", () => {
  let getUserUseCase: GetUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  const user_id_here = "123456";

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    getUserUseCase = new GetUserUseCase(inMemoryUserRepository);

    const fakeUser: User = {
      id: user_id_here,
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed_password",
      created_at: new Date(),
      deleted: false,
    };

    jest
      .spyOn(inMemoryUserRepository, "getUserById")
      .mockResolvedValue(fakeUser);
  });

  describe("Execute get user", () => {
    it("should be able to get an user by user_id", async () => {
      const result = await getUserUseCase.execute(user_id_here);

      expect(result.id).toBe(user_id_here);
      expect(result.name).toBe("John Doe");
      expect(result.email).toBe("johndoe@example.com");

      expect(inMemoryUserRepository.getUserById).toHaveBeenCalledWith(
        user_id_here
      );
    });
  });

  describe("Get user by id errors", () => {
    it("should throw HttpException when user is not found", async () => {
      const nonExistentUserId = "non_existent_user_id";

      jest.spyOn(inMemoryUserRepository, "getUserById").mockResolvedValue(null);

      const promise = getUserUseCase.execute(nonExistentUserId);

      await expect(promise).rejects.toThrow(
        new HttpException(
          HttpExceptionConstants.USER_NOT_FOUND.message,
          HttpStatus.NOT_FOUND
        )
      );
    });
  });
});
