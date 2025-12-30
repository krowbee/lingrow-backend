import { Expose, Type } from 'class-transformer';
import { TaskDto } from '../task/task.dto';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum EnglishLevels {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
}

export class LessonDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  theory: string;

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
