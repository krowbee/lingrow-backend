import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { LoginDto, RegisterDto } from './types/AuthDto';
import { AuthService } from './auth.service';
import type { Response } from 'express';
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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import type { TokenPayload } from './types/authTypes';

@ApiTags('Authorization')
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

  @ApiOperation({
    summary: 'Login',
    description: 'Login user, and returns message, UserDto',
  })
  @ApiBody({ type: LoginDto })
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

  @ApiOperation({
    summary: 'Register',
    description: 'Register user, returns message, UserDto',
  })
  @ApiBody({ type: RegisterDto })
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

  @ApiOperation({
    summary: 'Refresh Token',
    description: 'Refresh user tokens, and set new tokens in cookies',
  })
  @HttpCode(200)
  @RequireRefreshToken()
  @Post('/refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @RefreshToken() reqRefreshToken: string,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(reqRefreshToken);
    console.log(reqRefreshToken);
    this.setCookies({ accessToken, refreshToken }, res);
    return { message: 'Refreshed succesfully' };
  }

  @ApiOperation({
    summary: 'Get-Me',
    description: 'check auth, return user object',
  })
  @AuthOnly()
  @Get('/me')
  @HttpCode(200)
  async getMe(@CurrentUser() payload: TokenPayload) {
    const actualUser = await this.authService.getMe(payload);
    return actualUser;
  }

  @ApiOperation({
    summary: 'Logout',
    description: 'logout user, and clear tokens in cookies',
  })
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
