import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpStatus,
} from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/domain/guards";
import { RegisterUserDto, UserDto, UserDeletedDto } from "@/users/domain/dto";
import {
  RegisterUserUseCase,
  GetUserUseCase,
  SoftDeleteUserUseCase,
} from "@/users/domain/use-cases";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";

@Controller("users")
export class UsersController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly softDeleteUseCase: SoftDeleteUserUseCase
  ) {}

  @ApiTags("Users")
  @ApiBearerAuth()
  @ApiSecurity("Bearer")
  @ApiOperation({
    summary: "List an user by ID",
    description: "This route allows user to list your personal data by ID.",
  })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: "User success registered!",
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "ee6891a0-d199-480d-8c20-3f423e08d810",
        },
        name: {
          type: "string",
          example: "Victor Shimada",
        },
        email: {
          type: "string",
          example: "vic.shima@gmail.com",
        },
        password: {
          type: "string",
          example: "Password@1234",
        },
        deleted: {
          type: "boolean",
          example: false,
        },
        created_at: {
          type: "timestamp",
          example: "2023-03-29T00:02:05.494Z",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Failure registring user!",
  })
  @Post("signup")
  async create(@Body() createUserDto: RegisterUserDto): Promise<any> {
    const user: UserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      password_hash: "",
      createdAt: new Date(),
    };
    await this.registerUserUseCase.execute(user);
    return { message: "User created successfully" };
  }

  @ApiTags("Users")
  @ApiBearerAuth()
  @ApiSecurity("Bearer")
  @ApiOperation({
    summary: "List an user by ID",
    description: "This route allows user to list your personal data by ID.",
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "ee6891a0-d199-480d-8c20-3f423e08d810",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found!",
  })
  @Get("list/:id")
  @UseGuards(JwtAuthGuard)
  async getUser(@Param("id") user_id: string): Promise<UserDeletedDto> {
    return this.getUserUseCase.execute(user_id);
  }

  @ApiTags("Users")
  @ApiBearerAuth()
  @ApiSecurity("Bearer")
  @ApiOperation({
    summary: "Soft delete an user by ID",
    description: "This route allows user to soft delete an user by ID.",
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: "object",
      properties: {
        id: {
          type: "string",
          example: "ee6891a0-d199-480d-8c20-3f423e08d810",
        },
      },
    },
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: "User not found!",
  })
  @UseGuards(JwtAuthGuard)
  @Delete("delete/:id")
  async deleteUser(@Param("id") user_id: string): Promise<{ message: string }> {
    await this.softDeleteUseCase.execute(user_id);
    return { message: "User soft deleted successfully" };
  }
}
