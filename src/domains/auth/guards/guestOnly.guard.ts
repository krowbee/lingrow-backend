/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../tokens/token.service';

@Injectable()
export class GuestOnlyGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const accessToken: string | undefined = request.cookies.accessToken;
    if (!accessToken) return true;
    const payload = await this.tokenService.verifyAccessToken(accessToken);
    if (payload) {
      throw new ForbiddenException('You are already logged in');
    }

    return true;
  }
}
