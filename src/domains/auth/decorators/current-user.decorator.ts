/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../types/authTypes';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): TokenPayload | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return (request as any).user;
  },
);
