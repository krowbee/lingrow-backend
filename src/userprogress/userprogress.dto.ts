import { Answer, UserProgress } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class LessonProgress {
  lessonId: number;
  isCompleted: boolean;
}

export class TaskProgress {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  taskId: number;

  @Expose()
  @IsNumber()
  answerId: number;

  @Expose()
  @IsBoolean()
  isCorrect: boolean;
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
  @IsNumber()
  taskId: number;
  @IsNumber()
  answerId: number;
}

export type UserProgressWithAnswer = UserProgress & { answer: Answer };

export class UpdateProgressDto {
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
