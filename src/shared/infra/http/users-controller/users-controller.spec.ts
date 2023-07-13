import { UsersController } from "./users-controller";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { CreateUserDto } from "src/users/dto/create-user.dto";

describe("UsersController", () => {
  let usersController: UsersController;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    registerUserUseCase = new RegisterUserUseCase(null); // Passar a dependência adequada
    usersController = new UsersController(registerUserUseCase);
  });

  afterEach(() => {
    // Limpar quaisquer estados ou mocks necessários após cada teste
  });

  it("should create a new user", async () => {
    // Dados de teste
    const createUserDto: CreateUserDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    // Mock do método execute do RegisterUserUseCase
    registerUserUseCase.execute = jest.fn().mockResolvedValueOnce(undefined);

    // Chamar o método create do UsersController
    const response = await usersController.create(createUserDto);

    // Verificar se o método execute do RegisterUserUseCase foi chamado corretamente
    expect(registerUserUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        password_hash: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    // Verificar se a resposta contém a mensagem esperada
    expect(response).toEqual({ message: "User created successfully" });
  });
});
