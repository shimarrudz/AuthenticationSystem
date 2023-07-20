import { User } from "@prisma/client";
import { HttpException, HttpStatus } from "@nestjs/common";

import { SoftDeleteUserUseCase } from "./soft-delete";
import { InMemoryUserRepository } from "../../test/in-memory";
import { HttpExceptionConstants } from "@/shared/constants";

describe("Soft Delete User", () => {
  let softDeleteUserUseCase: SoftDeleteUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUserRepository();

    // Criar um usuário fictício com um ID válido
    const user_id_here = "user_id_here";
    const fakeUser: User = {
      id: user_id_here,
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: "hashed_password",
      created_at: new Date(),
      deleted: false,
    };

    // Configurar o mock para retornar o usuário fictício quando getUserById for chamado com o user_id_here
    jest
      .spyOn(inMemoryUserRepository, "getUserById")
      .mockResolvedValue(fakeUser);

    softDeleteUserUseCase = new SoftDeleteUserUseCase(inMemoryUserRepository);
  });
  describe("Success Test", () => {
    it("should soft delete a user", async () => {
      const user_id = "user_id_here";

      // Mockando o método getUserById para retornar um usuário encontrado
      jest.spyOn(inMemoryUserRepository, "getUserById").mockResolvedValue({
        id: user_id,
        name: "John Doe",
        email: "johndoe@example.com",
        password_hash: "",
        created_at: new Date(),
        deleted: null,
      });

      // Mockando o método softDeleteUser para retornar sucesso
      jest
        .spyOn(inMemoryUserRepository, "softDeleteUser")
        .mockResolvedValue(undefined);

      await expect(
        softDeleteUserUseCase.execute(user_id)
      ).resolves.toBeUndefined();

      // Verificando se o método getUserById foi chamado com o user_id correto
      expect(inMemoryUserRepository.getUserById).toHaveBeenCalledWith(user_id);

      // Verificando se o método softDeleteUser foi chamado com o user_id correto
      expect(inMemoryUserRepository.softDeleteUser).toHaveBeenCalledWith(
        user_id
      );
    });
    describe("Fail Test", () => {
      it("should throw HttpException when trying to delete a non-existent user", async () => {
        const nonExistentUserId = "non_existent_user_id";

        jest
          .spyOn(inMemoryUserRepository, "getUserById")
          .mockResolvedValue(null);

        const promise = softDeleteUserUseCase.execute(nonExistentUserId);

        await expect(promise).rejects.toThrow(
          new HttpException(
            HttpExceptionConstants.USER_NOT_FOUND.message,
            HttpStatus.NOT_FOUND
          )
        );
      });
    });
  });
});
