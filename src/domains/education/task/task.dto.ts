import { Expose, Type } from 'class-transformer';
import { AnswerDto } from '../answer/answer.dto';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  question: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  soundUrl?: string;
  /* validate nested dto */
  @ApiProperty({ type: AnswerDto })
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];

  @ApiProperty()
  @Expose()
  @IsNumber()
  lessonId: number;

  @ApiProperty()
  @Expose()
  @IsNumber()
  order: number;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsNumber()
  choosedAnswer: number;
}

export class CreateTaskDto extends PickType(TaskDto, [
  'question',
  'soundUrl',
  'lessonId',
  'answers',
  'order',
]) {}

export class UpdateTaskDto extends PartialType(
  PickType(CreateTaskDto, ['answers', 'order', 'question', 'soundUrl']),
) {}
