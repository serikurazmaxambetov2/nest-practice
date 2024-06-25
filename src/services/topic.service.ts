import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import TopicEntity from 'src/database/entities/topic.entity';
import TOPIC_PAGINATION_CONFIG from 'src/pagination/topic.pagination';
import { Repository } from 'typeorm';

@Injectable()
export default class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private topicRepository: Repository<TopicEntity>,
  ) {}

  async findPaginated(query: PaginateQuery) {
    return await paginate(query, this.topicRepository, TOPIC_PAGINATION_CONFIG);
  }
}
