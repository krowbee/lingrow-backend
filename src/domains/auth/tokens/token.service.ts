import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { accessTokenOptions, refreshTokenOptions } from './constants';
import { TokenPayload } from '../types/authTypes';
import { randomUUID } from 'crypto';
import { UserDto } from '../types/AuthDto';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async verifyAccessToken(
    accessToken: string,
  ): Promise<TokenPayload | undefined> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        accessToken,
        {
          secret: accessTokenOptions.secret,
        },
      );
      return payload;
    } catch {
      return undefined;
    }
  }

  async verifyRefreshToken(
    refreshToken: string,
  ): Promise<TokenPayload | undefined> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenPayload>(
        refreshToken,
        {
          secret: refreshTokenOptions.secret,
        },
      );
      return payload;
    } catch {
      return undefined;
    }
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      payload,
      refreshTokenOptions,
    );

    return refreshToken;
  }

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      payload,
      accessTokenOptions,
    );
    return accessToken;
  }

  generatePayload(user: UserDto): TokenPayload {
    const jti = randomUUID();
    return { id: user.id, email: user.email, jti: jti, role: user.role };
  }
}
