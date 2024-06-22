import { ApiProperty } from '@nestjs/swagger';
import AccessTokenResponseDto from './access-token-response.dto';

export default class TokensResponseDto extends AccessTokenResponseDto {
  @ApiProperty()
  refreshToken: string;
}
