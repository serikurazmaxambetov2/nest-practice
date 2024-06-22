import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import BadRequestResponseDto from 'src/dto/responses/error/bad-request-response.dto';
import AccessTokenResponseDto from 'src/dto/responses/token/access-token-response.dto';
import TokenRefreshDto from 'src/dto/token/token-refresh.dto';
import TokenService from 'src/services/token.service';

@ApiBadRequestResponse({ type: BadRequestResponseDto })
@ApiTags('Token')
@Controller('token')
export default class TokenController {
  constructor(private tokenService: TokenService) {}

  @ApiCreatedResponse({ type: AccessTokenResponseDto })
  @Post('refresh')
  async refreshAccessToken(@Body() tokenRefreshDto: TokenRefreshDto) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const payload = await this.tokenService.verifyRefreshToken(
        tokenRefreshDto.refreshToken,
      );

      const accessToken = await this.tokenService.generateAccessToken(payload);
      return { accessToken };
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Просроченный или некорректный токен!');
    }
  }
}
