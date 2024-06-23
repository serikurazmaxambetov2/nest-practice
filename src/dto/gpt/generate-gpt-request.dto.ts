import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class GenerateGptRequestDto {
  @ApiProperty({ format: 'uuid' })
  @IsOptional()
  @IsUUID('4', { message: 'Контекст должен быть uuid v4' })
  contextId: string;

  @ApiProperty({ type: 'string' })
  @IsString({ message: 'Сообщение должен быть строкой' })
  message: string;
}
