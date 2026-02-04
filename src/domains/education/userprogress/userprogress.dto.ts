import { ApiProperty } from '@nestjs/swagger';
import { Answer, UserProgress } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class TaskProgress {
  @ApiProperty({ example: '1', type: Number })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ example: '1', type: Number })
  @Expose()
  @IsNumber()
  taskId: number;

  @ApiProperty({ example: '1', type: Number })
  @Expose()
  @IsNumber()
  answerId: number;

  @ApiProperty({ example: true, type: Boolean })
  @Expose()
  @IsBoolean()
  isCorrect: boolean;
}

export class LessonProgress {
  @ApiProperty({ example: '1', type: Number })
  @Expose()
  @IsNumber()
  lessonId: number;
  @ApiProperty({ example: true, type: Boolean })
  @Expose()
  @IsBoolean()
  isCompleted: boolean;
}

export class GetCourseProgressData {
  userId: number;
  courseSlug: string;
}

export class GetLessonProgressData {
  userId: number;
  lessonSlug: string;
}

export class CreateProgressData {
  userId: number;
  taskId: number;
  answerId: number;
}

export class CreateProgressDto {
  @ApiProperty({ example: '1', type: Number })
  @IsNumber()
  taskId: number;

  @ApiProperty({ example: '1', type: Number })
  @IsNumber()
  answerId: number;
}

export type UserProgressWithAnswer = UserProgress & { answer: Answer };

export class UpdateProgressDto {
  @ApiProperty({ example: '1', type: Number })
  @IsNumber()
  answerId: number;
}

export class UpdateProgressData {
  userId: number;
  taskId: number;
  answerId: number;
}

export class DeleteLessonProgressData {
  userId: number;
  lessonId: number;
}
