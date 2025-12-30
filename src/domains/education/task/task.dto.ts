import { Expose, Type } from 'class-transformer';
import { AnswerDto } from '../answer/answer.dto';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TaskDto {
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
  /* validate nested dto */
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @Expose()
  @IsNumber()
  lessonId: number;

  @Expose()
  @IsNumber()
  order: number;
}
