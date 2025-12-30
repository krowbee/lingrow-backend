import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class RegisterDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class LogoutDto {
  @Expose()
  @IsString()
  refreshToken: string;
}

export class UserDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;
}
