import { ApiProperty } from '@nestjs/swagger';
import TopicDetailDto from '../topic/topic-detail.dto';

export default class QuestionDetailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  answer: string;

  @ApiProperty({ type: TopicDetailDto })
  topic: TopicDetailDto;
}
