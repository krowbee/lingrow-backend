import { Expose, Type } from 'class-transformer';
import { TaskDto } from '../task/task.dto';

import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';
import { EnglishLevels } from '@prisma/client';

export class PublicLessonDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsNumber()
  order: number;
}

export class LessonDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsObject()
  theory: any;

  @Expose()
  @IsString()
  slug: string;

  @Expose()
  @IsEnum(EnglishLevels)
  englishLevel: EnglishLevels;

  @Expose()
  @IsNumber()
  courseId: number;

  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks?: TaskDto[];

  @Expose()
  @IsNumber()
  order: number;
}

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @IsOptional()
  theory: any;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsEnum(EnglishLevels)
  @IsNotEmpty()
  englishLevel: EnglishLevels;

  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class UpdateLessonDto extends PartialType(
  OmitType(CreateLessonDto, ['courseId']),
) {}
