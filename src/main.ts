import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./shared/middlewares";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle("Authentication System")
    .setDescription("Implementing swagger at first time")
    .setVersion("1.0")
    .addTag("main")
    .build();

  await app.listen(3000);
}
bootstrap();
