import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import TokenService from 'src/services/token.service';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<Request>();
    const authHeaders = request.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    const [type, token] = authHeaders.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Вы не авторизованы');
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const payload = await this.tokenService.verifyAccessToken(token);
      request['payload'] = payload;
    } catch {
      throw new UnauthorizedException('Некорректный токен или ');
    }

    return true;
  }
}
