import { ApiProperty } from '@nestjs/swagger';

export class GptMessageDto {
  @ApiProperty({ oneOf: [{ example: 'user' }, { example: 'assistant' }] })
  role: 'user' | 'assistant';

  @ApiProperty({ type: 'string' })
  content: string;
}
