import { Test, TestingModule } from "@nestjs/testing";
import { SoftDeleteUserUseCase } from "./soft-delete";
import { HttpExceptionConstants } from "@/shared/constants";
import { HttpException, HttpStatus } from "@nestjs/common";
import { InMemoryUserRepository } from "../../test/in-memory";
import { IUserRepository } from "../../interfaces";

describe("Soft Delete User", () => {
  let softDeleteUserUseCase: SoftDeleteUserUseCase;
  let inMemoryUserRepository: InMemoryUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoftDeleteUserUseCase,
        InMemoryUserRepository,
        {
          provide: IUserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    softDeleteUserUseCase = module.get<SoftDeleteUserUseCase>(
      SoftDeleteUserUseCase
    );
    inMemoryUserRepository = module.get<InMemoryUserRepository>(
      InMemoryUserRepository
    );
  });

  it("should soft delete a user", async () => {
    const user_id = "user_id_here";

    // Mockando o método getUserById para retornar um usuário
    jest.spyOn(inMemoryUserRepository, "getUserById").mockResolvedValue({
      id: user_id,
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: '',
      created_at: new Date(),
      deleted: false,
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
    expect(inMemoryUserRepository.softDeleteUser).toHaveBeenCalledWith(user_id);
  });

  it("should throw HttpException when user is not found", async () => {
    const user_id = "non_existent_user_id";

    // Mockando o método getUserById para retornar null, indicando que o usuário não foi encontrado
    jest.spyOn(inMemoryUserRepository, "getUserById").mockResolvedValue(null);

    await expect(softDeleteUserUseCase.execute(user_id)).rejects.toThrow(
      new HttpException(
        HttpExceptionConstants.USER_NOT_FOUND.message,
        HttpStatus.NOT_FOUND
      )
    );

    // Verificando se o método getUserById foi chamado com o user_id correto
    expect(inMemoryUserRepository.getUserById).toHaveBeenCalledWith(user_id);

    // Verificando se o método softDeleteUser não foi chamado (usuário não encontrado, não deve ser excluído)
    expect(inMemoryUserRepository.softDeleteUser).not.toHaveBeenCalled();
  });
});
