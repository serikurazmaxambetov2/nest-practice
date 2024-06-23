import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({
    oneOf: [{ type: 'array', items: { type: 'string' } }, { type: 'string' }],
  })
  message: string | string[];

  @ApiProperty({ example: 'BadRequest' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
