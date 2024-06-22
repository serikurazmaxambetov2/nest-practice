import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const JwtPayload = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request['payload'];
  },
);
