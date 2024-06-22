import { ApiProperty } from '@nestjs/swagger';
import ErrorResponseDto from './error-response.dto';

export default class UnauthorizedResponseDto extends ErrorResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 401 })
  statusCode: number;
}
