import { UsersController } from "./users-controller";
import { RegisterUserUseCase } from "src/users/use-cases/register-user/register-user";
import { CreateUserDto } from "src/users/dto/create-user.dto";

describe("Users Controller", () => {
  let usersController: UsersController;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    registerUserUseCase = new RegisterUserUseCase(null); // Passar a dependência adequada
    usersController = new UsersController(registerUserUseCase);
  });

  afterEach(() => {
  });

  it("should be able to create an suser", async () => {
    const createUserDto: CreateUserDto = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    };

    registerUserUseCase.execute = jest.fn().mockResolvedValueOnce(undefined);

    const response = await usersController.create(createUserDto);

    expect(registerUserUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        password_hash: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    expect(response).toEqual({ message: "User created successfully" });
  });
});
