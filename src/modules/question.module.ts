import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import QuestionController from 'src/controllers/question.controller';
import QuestionEntity from 'src/database/entities/question.entity';
import QuestionService from 'src/services/question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export default class QuestionModule {}
