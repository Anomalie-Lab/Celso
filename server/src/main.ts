import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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
  app.use(cors({ 
    origin: [
      "http://localhost:3000", 
      "http://localhost:8080",
      "https://ecommerce-wl.vercel.app",
      "https://celso-admin.vercel.app"
    ], 
    credentials: true 
  }));

  // Servir arquivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/',
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
