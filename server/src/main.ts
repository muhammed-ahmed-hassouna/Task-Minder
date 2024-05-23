import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true
    }),
  );


  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, 
  });
  const configService = app.get(ConfigService);

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Todo-List APIs')
    .setDescription("Todo-List APIs")
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth",
    )
    .addTag("Todo-List")
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  const port = configService.get('port')

  await app.listen(port || 3500);

  Logger.log(
    `Application is running on: http://localhost:${port}`,
  );
}
bootstrap();
