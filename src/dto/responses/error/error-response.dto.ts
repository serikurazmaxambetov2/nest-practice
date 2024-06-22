import { ApiProperty } from '@nestjs/swagger';

export default class ErrorResponseDto {
  @ApiProperty()
  error: string;

  @ApiProperty()
  statusCode: number;
}
