import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { IUserRepository } from "../../interfaces";
import { HttpExceptionConstants } from "@/shared/constants";

@Injectable()
export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.userRepository.getUserById(user_id);

    if (!user) {
      throw new HttpException(
        HttpExceptionConstants.USER_NOT_FOUND.message,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
}
