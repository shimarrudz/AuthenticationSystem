import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "@/app.module";

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule], // Verifique o AppModule aqui também
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}

export function closeTestApp(app: INestApplication): Promise<void> {
  return app.close();
}
