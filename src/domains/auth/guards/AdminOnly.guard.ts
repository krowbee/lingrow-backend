import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../tokens/token.service';
import { Request } from 'express';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.accessToken as string | undefined;

    if (!token) throw new UnauthorizedException('Invalid access token');

    const payload = await this.tokenService.verifyAccessToken(token);
    if (!payload) throw new UnauthorizedException('Invalid access token');

    if (payload.role !== 'admin')
      throw new ForbiddenException("You don't have access to this recourse");

    request['user'] = payload;
    return true;
  }
}
