import { PaginateConfig } from 'nestjs-paginate';
import TopicEntity from 'src/database/entities/topic.entity';

const TOPIC_PAGINATION_CONFIG: PaginateConfig<TopicEntity> = {
  sortableColumns: ['index'],
  maxLimit: 10,
  defaultLimit: 10,
  ignoreSelectInQueryParam: true,
};

export default TOPIC_PAGINATION_CONFIG;
