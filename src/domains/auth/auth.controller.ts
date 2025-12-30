import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from './types/AuthDto';
import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
import {
  refreshCookieOptions,
  accessCookieOptions,
} from './constants/cookieOptions';
import {
  AuthOnly,
  GuestOnly,
  RequireRefreshToken,
} from './decorators/auth.decorators';
import { RefreshToken } from './decorators/refresh-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  private clearCookies(res: Response): void {
    res.clearCookie('accessToken', accessCookieOptions);
    res.clearCookie('refreshToken', refreshCookieOptions);
  }

  private setCookies(
    {
      accessToken,
      refreshToken,
    }: {
      accessToken: string;
      refreshToken: string;
    },
    res: Response,
  ): void {
    res.cookie('accessToken', accessToken, accessCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  }

  @GuestOnly()
  @HttpCode(200)
  @Post('/login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() data: LoginDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.login(data);

    this.setCookies({ accessToken, refreshToken }, res);
    return { message: 'Login succesful', user };
  }

  @GuestOnly()
  @Post('/register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() data: RegisterDto,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.register(data);

    this.setCookies({ accessToken, refreshToken }, res);
    return { message: 'User created succesfully', user };
  }

  @HttpCode(200)
  @RequireRefreshToken()
  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() reqRefreshToken: string,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(reqRefreshToken);
    this.setCookies({ accessToken, refreshToken }, res);
    return { message: 'Refreshed succesfully' };
  }

  @AuthOnly()
  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() reqRefreshToken: string,
  ) {
    const result = await this.authService.logout({
      refreshToken: reqRefreshToken,
    });
    this.clearCookies(res);
    return { message: 'Logout succesful', success: result };
  }
}
