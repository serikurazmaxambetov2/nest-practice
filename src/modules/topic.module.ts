import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TopicController from 'src/controllers/topic.controller';
import TopicEntity from 'src/database/entities/topic.entity';
import TopicService from 'src/services/topic.service';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export default class TopicModule {}
