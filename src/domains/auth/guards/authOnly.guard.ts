import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../tokens/token.service';

@Injectable()
export class AuthOnlyGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.accessToken as string | undefined;
    if (!token) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyAccessToken(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid access token');
    }
    request['user'] = payload;
    return true;
  }
}
