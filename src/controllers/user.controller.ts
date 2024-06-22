import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtPayload } from 'src/decorators/jwt-payload.decorator';
import UnauthorizedResponseDto from 'src/dto/responses/error/unauthorized-response';
import TokenPayloadDto from 'src/dto/token/token-payload.dto';
import AuthGuard from 'src/guards/auth.guard';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export default class UserController {
  @ApiOkResponse({ type: TokenPayloadDto })
  @ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
  @UseGuards(AuthGuard)
  @Get('me')
  async getMe(@JwtPayload() payload: TokenPayloadDto) {
    return payload;
  }
}
