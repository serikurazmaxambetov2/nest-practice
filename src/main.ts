import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

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

  // OpenApi
  const config = new DocumentBuilder()
    .setTitle('MathTest')
    .setDescription(
      `MathTest - приложение которое полезно для абитуриентов.
Предоставляет api для списка тестов по математике, начиная с простых чисел до конца геометрий.
Все тесты парсятся с сайта test-uz.ru .`,
    )
    .setVersion('1.3.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8081);
}

start();
