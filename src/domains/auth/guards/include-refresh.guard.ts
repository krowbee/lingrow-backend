/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IncludeRefreshGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token');
    }
    return true;
  }
}
