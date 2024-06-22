import { ApiProperty } from '@nestjs/swagger';
import ErrorResponseDto from './error-response.dto';

export default class BadRequestResponseDto extends ErrorResponseDto {
  @ApiProperty({
    oneOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
  })
  message: string[];

  @ApiProperty({ example: 'BadRequest' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
