/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const RefreshToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.cookies.refreshToken;
  },
);
