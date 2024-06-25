import { ApiProperty } from '@nestjs/swagger';

export default class TopicDetailDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  index: number;

  @ApiProperty()
  name: string;
}
