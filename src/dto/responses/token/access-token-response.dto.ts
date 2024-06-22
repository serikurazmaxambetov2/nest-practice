import { ApiProperty } from '@nestjs/swagger';

export default class AccessTokenResponseDto {
  @ApiProperty()
  accessToken: string;
}
