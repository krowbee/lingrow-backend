import { UserDto } from './AuthDto';

export type TokenPayload = {
  id: number;
  email: string;
  jti: string;
  role: string;
};

export type RotateSessionData = {
  oldJti: string;
  user: UserDto;
  refreshToken: string;
  payload: TokenPayload;
};
export type CreateSessionData = {
  user: UserDto;
  payload: TokenPayload;
};
