import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4321',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strips unknown properties
    forbidNonWhitelisted: true,
    transform: true, // transforms payloads to DTO instances
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
