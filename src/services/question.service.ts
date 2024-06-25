import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate } from 'nestjs-paginate';
import QuestionEntity from 'src/database/entities/question.entity';
import QUESTION_PAGINATION_CONFIG from 'src/pagination/question.pagination';
import { Repository } from 'typeorm';

@Injectable()
export default class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,
  ) {}

  async findPaginated(query: PaginateQuery) {
    return await paginate(
      query,
      this.questionRepository,
      QUESTION_PAGINATION_CONFIG,
    );
  }
}
