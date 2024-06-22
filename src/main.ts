import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';

async function start() {
  const app = await NestFactory.create(AppModule);

  // OpenApi
  const config = new DocumentBuilder()
    .setTitle('Приложение')
    .setDescription('Описание')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(8081);
}

start();
