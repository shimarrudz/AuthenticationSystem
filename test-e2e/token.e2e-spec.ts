import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { InMemoryLoginRepository } from "@/auth/domain/test/in-memory/in-memory-login-repository";
import { InMemoryRefreshToken } from "@/token/domain/test/in-memory/in-memory-token-repository";
import { TokenController } from "@/shared/infra/http";

describe("TokenController (e2e)", () => {
  let app: INestApplication;
  let inMemoryLoginRepository: InMemoryLoginRepository;
  let inMemoryRefreshToken: InMemoryRefreshToken;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TokenController)
      .useValue({
        loginUseCase: {
          refreshTokenRepository: inMemoryLoginRepository,
        },
        refreshTokenUseCase: {
          refreshTokenRepository: inMemoryRefreshToken,
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    inMemoryLoginRepository = new InMemoryLoginRepository();
    inMemoryRefreshToken = new InMemoryRefreshToken();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("/token/refresh (POST)", () => {
    it("should refresh the token and return a new access token", async () => {
      // Create a fake user to be used for refresh
      const fakeUser = {
        id: "user_id_here", // Replace with the correct user ID
        email: "test@example.com",
      };
      // Generate a valid refresh token for the fake user
      const refreshToken = await inMemoryLoginRepository.createRefreshToken(
        "refresh_token_here", // Replace with the correct refresh token
        fakeUser.id,
        new Date(Date.now() + 1000 * 60 * 5) // 5 minutes from now
      );

      // Send the refresh request with the valid refresh token as Bearer token
      const response = await request(app.getHttpServer())
        .post("/token/refresh")
        .set("Authorization", `Bearer ${refreshToken.token}`);

      // Expect the response to be successful (HTTP status 200)
      expect(response.status).toBe(HttpStatus.OK);
      // Expect the response body to contain the new access token
      expect(response.body).toHaveProperty("accessToken");
    });

    it("should return Unauthorized when refresh token is invalid", async () => {
      // Send the refresh request with an invalid refresh token
      const response = await request(app.getHttpServer())
        .post("/token/refresh")
        .set("Authorization", "Bearer invalid_refresh_token");

      // Expect the response to be Unauthorized (HTTP status 401)
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    });
  });
});
