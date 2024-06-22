import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export default class TokenRefreshDto {
  @ApiProperty({ type: String })
  @IsJWT({ message: 'Некорректный refresh токен' })
  refreshToken: string;
}
