import { JwtSignOptions } from '@nestjs/jwt';

export const accessTokenOptions: JwtSignOptions = {
  secret: process.env.ACCESS_SECRET,
  expiresIn: '60s',
};

export const refreshTokenOptions: JwtSignOptions = {
  secret: process.env.REFRESH_SECRET,
  expiresIn: '7d',
};
