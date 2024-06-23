import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/database/data.source';
import { GptModule } from './gpt.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), GptModule],
})
export class AppModule {}
