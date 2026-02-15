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
import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { EnglishLevels } from '@prisma/client';

export class LessonDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsObject()
  @IsOptional()
  theory: any;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @Expose()
  @IsEnum(EnglishLevels)
  @IsNotEmpty()
  englishLevel: EnglishLevels;

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  courseId: number;

  @ApiProperty({ type: TaskDto })
  @Expose()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskDto)
  tasks?: TaskDto[];

  @ApiProperty()
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  order: number;
}

export class PublicLessonDto extends PickType(LessonDto, [
  'id',
  'name',
  'slug',
  'order',
]) {}

export class CreateLessonDto extends PickType(LessonDto, [
  'name',
  'theory',
  'slug',
  'englishLevel',
  'courseId',
  'order',
]) {}

export class UpdateLessonDto extends PartialType(
  OmitType(CreateLessonDto, ['courseId']),
) {}
