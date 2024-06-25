import { PaginateConfig } from 'nestjs-paginate';
import QuestionEntity from 'src/database/entities/question.entity';

const QUESTION_PAGINATION_CONFIG: PaginateConfig<QuestionEntity> = {
  sortableColumns: ['topic.(index)'],
  maxLimit: 10,
  defaultLimit: 10,
  relations: ['topic'],
  filterableColumns: {
    'topic.id': true,
  },
  ignoreSelectInQueryParam: true,
};

export default QUESTION_PAGINATION_CONFIG;
