import { ApiProperty } from '@nestjs/swagger';
import { GptMessageDto } from 'src/dto/gpt/gpt-message.dto';

export class GenerateGptResponseDto {
  @ApiProperty({ format: 'uuid' })
  contextId: string;

  @ApiProperty({ type: [GptMessageDto] })
  messages: GptMessageDto[];
}
