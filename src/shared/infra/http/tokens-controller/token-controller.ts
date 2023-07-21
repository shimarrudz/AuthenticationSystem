import { Controller, Post, Body, UseGuards, HttpStatus } from "@nestjs/common";

import { JwtAuthGuard } from "@/auth/domain/guards";
import { Login } from "@/auth/domain/use-case";
import { Refresh } from "@/token/domain/use-cases";
import { UserTokenDto, RefreshPayloadTokenDto } from "@/token/domain/dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";

@Controller("token")
export class TokenController {
  constructor(
    private readonly loginUseCase: Login,
    private readonly refreshTokenUseCase: Refresh
  ) {}

  @ApiTags("Login")
  @ApiOperation({
    summary: "User login",
    description: "This route validate user login, to generate access and refresh token",
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: "object",
      properties: {
        email: {
         type: "string",
         example: "vic.shima.vss@gmail.com"
        },
        refreshToken: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDBiNDExYS0zODI0LTQwNjMtOGU4MS1kN2IwNjdhMDI4ZDIiLCJpYXQiOjE2ODk5MTU3MjMsImV4cCI6MTY4OTkxNTkwM30.Bc153HQvNgPl8tZhlNpmK_OsboU9WuONyvufaeKkVS4",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Refresh token not found!",
  })
  @Post("login")
  async login(
    @Body() loginData: { email: string; password: string }
  ): Promise<UserTokenDto> {
    const { email, password } = loginData;
    const userToken = await this.loginUseCase.execute(email, password);
    return userToken;
  }

  @ApiTags("Token")
  @ApiBearerAuth()
  @ApiSecurity("Bearer")
  @ApiOperation({
    summary: "Refresh authencticate token",
    description: "This route allows that user refresh, to refresh token",
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    schema: {
      type: "object",
      properties: {
        refreshToken: {
          type: "string",
          example:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDBiNDExYS0zODI0LTQwNjMtOGU4MS1kN2IwNjdhMDI4ZDIiLCJpYXQiOjE2ODk5MTU3MjMsImV4cCI6MTY4OTkxNTkwM30.Bc153HQvNgPl8tZhlNpmK_OsboU9WuONyvufaeKkVS4",
        },
      },
    },
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Refresh token not found!",
  })
  @UseGuards(JwtAuthGuard)
  @Post("refresh")
  async refresh(
    @Body("refreshToken") refreshToken: string
  ): Promise<RefreshPayloadTokenDto> {
    return this.refreshTokenUseCase.execute(refreshToken);
  }
}
