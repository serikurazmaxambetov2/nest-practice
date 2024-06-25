import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';
import QuestionDetailDto from 'src/dto/question/question-detail.dto';
import QUESTION_PAGINATION_CONFIG from 'src/pagination/question.pagination';
import QuestionService from 'src/services/question.service';

@ApiTags('Question')
@Controller('question')
export default class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  @PaginatedSwaggerDocs(QuestionDetailDto, QUESTION_PAGINATION_CONFIG)
  async findPaginated(@Paginate() query: PaginateQuery) {
    return await this.questionService.findPaginated(query);
  }
}
