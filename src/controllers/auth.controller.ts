import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import BadRequestResponseDto from 'src/dto/responses/error/bad-request-response.dto';
import UnauthorizedResponseDto from 'src/dto/responses/error/unauthorized-response';
import TokensResponseDto from 'src/dto/responses/token/tokens-response.dto';
import UserCreateDto from 'src/dto/user/user-create.dto';
import UserLoginDto from 'src/dto/user/user-login.dto';
import AuthService from 'src/services/auth.service';

@ApiBadRequestResponse({ type: BadRequestResponseDto }) // Если некорректные данные отправлены
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@ApiTags('Auth')
@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ type: TokensResponseDto })
  @Post('register')
  async register(@Body() userCreateDto: UserCreateDto) {
    return await this.authService.register(userCreateDto);
  }

  @ApiOkResponse({ type: TokensResponseDto })
  @Post('login')
  @HttpCode(HttpStatus.OK) // Created не очень подходит.
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.authService.login(userLoginDto);
  }
}
