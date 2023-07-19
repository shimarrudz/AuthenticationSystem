import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserRepository } from "@/users/infra/repositories";
import { HttpExceptionConstants } from "@/shared/constants";

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

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