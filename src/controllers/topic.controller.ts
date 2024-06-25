import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';
import TopicDetailDto from 'src/dto/topic/topic-detail.dto';
import TOPIC_PAGINATION_CONFIG from 'src/pagination/topic.pagination';
import TopicService from 'src/services/topic.service';

@ApiTags('Topic')
@Controller('topic')
export default class TopicController {
  constructor(private topicService: TopicService) {}

  @Get()
  @PaginatedSwaggerDocs(TopicDetailDto, TOPIC_PAGINATION_CONFIG)
  async findPaginated(@Paginate() query: PaginateQuery) {
    return await this.topicService.findPaginated(query);
  }
}
