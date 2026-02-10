import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@gmail.com', type: String })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456789', type: String })
  @Expose()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class RegisterDto {
  @ApiProperty({ example: 'test@gmail.com', type: String })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ example: '123456789', type: String })
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

  @Expose()
  @IsString()
  role: string;
}
