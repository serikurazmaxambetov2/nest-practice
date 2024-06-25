import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/data.source';
import initializeDatabase from 'src/scripts/initialize-database';
import QuestionModule from './question.module';
import TopicModule from './topic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    QuestionModule,
    TopicModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  private logger = new Logger();

  async onApplicationBootstrap() {
    this.logger.log('--- Начало инициализации тестовых заданий ---');
    await initializeDatabase();
    this.logger.log('--- Конец инициализации тестовых заданий ---');
  }
}
