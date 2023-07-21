import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UserDto } from "../../dto";
import { HttpExceptionConstants } from "@/shared/constants";
import { IUserRepository } from "../../interfaces";

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: UserDto): Promise<void> {
    const { name, email, password } = data;

    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictException(
        HttpExceptionConstants.USER_ALREADY_EXISTS.message
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    try {
      await this.userRepository.create({
        name,
        email,
        password,
        password_hash: passwordHash,
        createdAt: new Date(),
      });
    } catch (error) {
      throw new InternalServerErrorException(
        HttpExceptionConstants.FAILED_TO_CREATE_USER.message
      );
    }
  }
}
