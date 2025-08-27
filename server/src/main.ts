import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Ecommerce API")
    .setDescription("")
    .setVersion("0.0.1")
    .addTag("Auth", "Endpoints for user authentication")
    .addTag("Account", "Endpoints for user management")
    .addTag("Cache", "Endpoints related to cache management")
    .setContact("Creator", "developer@gmail.com", "https://developer.dev")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  app.use(cookieParser());
  app.use(cors({ origin: ["http://localhost:3000", "http://localhost:8080", "http://127.0.0.1:8080", "http://localhost:5173"], credentials: true }));

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
