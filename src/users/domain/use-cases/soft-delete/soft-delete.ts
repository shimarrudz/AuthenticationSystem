import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IUserRepository } from "../../interfaces";
import { HttpExceptionConstants } from "@/shared/constants";

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user_id: string): Promise<void> {
    const user = await this.userRepository.getUserById(user_id);
    if (!user) {
      throw new HttpException(
        HttpExceptionConstants.USER_NOT_FOUND.message,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.softDeleteUser(user_id);
  }
}