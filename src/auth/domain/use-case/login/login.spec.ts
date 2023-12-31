import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { Login } from "./login";
import { UserTokenDto } from "@/token/domain/dto";
import { InMemoryLoginRepository } from "@/auth/domain/test/in-memory/in-memory-login-repository";

describe("Login", () => {
  let loginUseCase: Login;
  let jwtService: JwtService;
  let inMemoryLoginRepository: InMemoryLoginRepository;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: process.env.JWT_SECRET,
    });
    inMemoryLoginRepository = new InMemoryLoginRepository();
    loginUseCase = new Login(jwtService, inMemoryLoginRepository);
  });

  it("should be able to return access token and refresh token when credentials are valid", async () => {
    const email = "john.doe@example.com";
    const password = "securePassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: hashedPassword,
      created_at: new Date(),
      deleted: false,
    };
    inMemoryLoginRepository["users"].push(user);

    const result: UserTokenDto = await loginUseCase.execute(email, password);

    expect(result.access_token).toBeTruthy();
    expect(result.refresh_token).toBeTruthy();
  });

  it("should be able to throw UnauthorizedException when email is not found", async () => {
    const email = "john.doe@example.com";
    const password = "securePassword";

    await expect(loginUseCase.execute(email, password)).rejects.toThrow(
      UnauthorizedException
    );
  });

  it("should throw be able to UnauthorizedException when password does not match", async () => {
    const email = "john.doe@example.com";
    const password = "securePassword";
    const hashedPassword = await bcrypt.hash("incorrectPassword", 10);

    const user: User = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password_hash: hashedPassword,
      created_at: new Date(),
      deleted: false,
    };
    inMemoryLoginRepository["users"].push(user);

    await expect(loginUseCase.execute(email, password)).rejects.toThrow(
      UnauthorizedException
    );
  });
});
