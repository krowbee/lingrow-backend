import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SessionService } from 'src/domains/auth/session/session.service';
import { UserService } from 'src/user/user.service';
import {
  CreateSessionData,
  RotateSessionData,
  TokenPayload,
} from './types/authTypes';
import { CryptoService } from './crypto.service';
import { LoginDto, LogoutDto, RegisterDto, UserDto } from './types/AuthDto';
import { toDto } from 'src/lib/transform';
import { TokenService } from './tokens/token.service';
import { User } from '@prisma/client';

const invalidTokenErr = new UnauthorizedException(
  'Invalid or expired refresh token',
);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private cryptoService: CryptoService,
    private tokenService: TokenService,
  ) {}

  async login(
    data: LoginDto,
  ): Promise<{ refreshToken: string; accessToken: string; user: UserDto }> {
    const user: User | null = await this.userService.findUser({
      email: data.email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.cryptoService.compareValue(
      data.password,
      user.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.buildAuthResponse(user);
  }

  async register(
    data: RegisterDto,
  ): Promise<{ refreshToken: string; accessToken: string; user: UserDto }> {
    const isUserExist = await this.userService.findUser({ email: data.email });

    if (isUserExist) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await this.cryptoService.hashValue(data.password);

    const user: User = await this.userService.userCreate({
      ...data,
      password: hashedPassword,
    });

    return this.buildAuthResponse(user);
  }

  async getMe(payload: TokenPayload) {
    const user = await this.userService.findUser({ id: payload.id });
    if (!user) {
      throw invalidTokenErr;
    }
    return toDto(UserDto, user);
  }

  async validateRefreshFlow(
    refreshToken: string,
  ): Promise<{ user: User; oldPayload: TokenPayload }> {
    const oldPayload = await this.tokenService.verifyRefreshToken(refreshToken);
    if (!oldPayload) {
      throw invalidTokenErr;
    }

    const user = await this.userService.findUser({ id: oldPayload.id });
    if (!user) {
      throw invalidTokenErr;
    }
    return { oldPayload, user };
  }

  async refreshTokens(reqRefreshToken: string) {
    const { oldPayload, user } =
      await this.validateRefreshFlow(reqRefreshToken);

    const newPayload = this.tokenService.generatePayload(user);
    const accessToken = await this.tokenService.generateAccessToken(newPayload);

    const { refreshToken } = await this.rotateSession({
      user: user,
      oldJti: oldPayload.jti,
      refreshToken: reqRefreshToken,
      payload: newPayload,
    });

    return { refreshToken, accessToken };
  }

  async logout(data: LogoutDto) {
    const payload = await this.tokenService.verifyRefreshToken(
      data.refreshToken,
    );
    if (!payload) throw invalidTokenErr;

    await this.sessionService.deleteSession({
      jti: payload.jti,
    });

    return true;
  }

  private async issueRefreshToken(
    payload: TokenPayload,
  ): Promise<{ refreshToken: string; hashedRefreshToken: string }> {
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    const hashedRefreshToken = await this.cryptoService.hashValue(refreshToken);
    return { refreshToken, hashedRefreshToken };
  }

  private async createSession(data: CreateSessionData): Promise<string> {
    const { refreshToken, hashedRefreshToken } = await this.issueRefreshToken(
      data.payload,
    );

    const createdSession = await this.sessionService.createSession({
      jti: data.payload.jti,
      hashedRefreshToken,
      userId: data.user.id,
    });
    if (!createdSession) {
      throw new InternalServerErrorException();
    }
    return refreshToken;
  }

  private async rotateSession(
    data: RotateSessionData,
  ): Promise<{ refreshToken: string }> {
    const session = await this.sessionService.getSession({ jti: data.oldJti });

    if (!session) throw invalidTokenErr;

    const isValid = await this.cryptoService.compareValue(
      data.refreshToken,
      session.hashedRefreshToken,
    );

    if (!isValid) {
      throw invalidTokenErr;
    }

    const { refreshToken, hashedRefreshToken } = await this.issueRefreshToken(
      data.payload,
    );

    const updatedSession = await this.sessionService.updateSession(
      { jti: data.oldJti },
      { hashedRefreshToken, jti: data.payload.jti },
    );

    if (!updatedSession) {
      throw new InternalServerErrorException();
    }

    return { refreshToken };
  }

  private async buildAuthResponse(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserDto;
  }> {
    const responseUser = toDto(UserDto, user);
    const payload = this.tokenService.generatePayload(user);
    const refreshToken = await this.createSession({ user, payload });
    const accessToken = await this.tokenService.generateAccessToken(payload);
    return { accessToken, refreshToken, user: responseUser };
  }
}
