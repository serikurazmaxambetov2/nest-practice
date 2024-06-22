import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  // Документация API
  const config = new DocumentBuilder()
    .setTitle('Auth')
    .setDescription(
      `Простое приложение для
1. **Авторизаций**
2. **Регистраций**`,
    )
    .addBearerAuth()
    .setVersion('1.1.0')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(8081);
}

start();
