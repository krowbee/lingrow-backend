import { Answer, UserProgress } from '@prisma/client';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export type LessonProgress = {
  lessonId: number;
  isCompleted: boolean;
};

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

export type GetCourseProgressData = {
  userId: number;
  courseSlug: string;
};

export type GetLessonProgressData = {
  userId: number;
  lessonSlug: string;
};

export type CreateProgressData = {
  userId: number;
  taskId: number;
  answerId: number;
};

export class CreateProgressDto {
  taskId: number;
  answerId: number;
}

export type UserProgressWithAnswer = UserProgress & { answer: Answer };

export type UpdateProgressData = {
  userId: number;
  taskId: number;
  answerId: number;
};

export type DeleteLessonProgressData = {
  userId: number;
  lessonId: number;
};
