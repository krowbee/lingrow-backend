import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
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

export class CourseDTO {
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
  @IsString()
  description: string;
}

export class LessonDTO {
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
  @Type(() => TaskDTO)
  tasks?: TaskDTO[];

  @Expose()
  @IsNumber()
  order: number;
}

export class TaskDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  question: string;

  @Expose()
  @IsOptional()
  @IsString()
  soundUrl?: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDTO)
  answers: AnswerDTO[];

  @Expose()
  @IsNumber()
  lessonId: number;

  @Expose()
  @IsNumber()
  order: number;
}

export class AnswerDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  text: string;

  @Exclude()
  isCorrect: boolean;

  @Expose()
  @IsNumber()
  taskId: number;
}
