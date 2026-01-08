import { Injectable } from '@nestjs/common';
import PrismaService from 'src/lib/prisma/prisma.service';
import {
  DeleteLessonProgressData,
  GetCourseProgressData,
  GetLessonProgressData,
  TaskProgress,
  UpdateProgressData,
  UserProgressWithAnswer,
} from './userprogress.dto';
import { CreateProgressData, LessonProgress } from './userprogress.dto';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}

  private generateTaskProgress(
    progress: UserProgressWithAnswer | UserProgressWithAnswer[],
  ): TaskProgress[] {
    const items = Array.isArray(progress) ? progress : [progress];
    return items.map((p) => ({
      id: p.id,
      taskId: p.taskId,
      answerId: p.answerId,
      isCorrect: p.answer.isCorrect,
    }));
  }

  async getCourseProgress(
    getCourseProgressData: GetCourseProgressData,
  ): Promise<LessonProgress[]> {
    const progressByLessons = await this.prisma.userProgress.findMany({
      where: {
        userId: getCourseProgressData.userId,
        task: {
          lesson: { course: { slug: getCourseProgressData.courseSlug } },
        },
      },
      include: { task: { select: { id: true, lessonId: true } } },
    });
    const progressCountByLesson: Record<number, number> = {};
    for (const up of progressByLessons) {
      const lessonId = up.task.lessonId;
      progressCountByLesson[lessonId] =
        (progressCountByLesson[lessonId] || 0) + 1;
    }

    const lessonsCompleted: LessonProgress[] = Object.entries(
      progressCountByLesson,
    ).map(([lessonId, count]) => ({
      lessonId: Number(lessonId),
      isCompleted: count === 10,
    }));
    return lessonsCompleted;
  }

  async getLessonProgress(
    getLessonProgressData: GetLessonProgressData,
  ): Promise<TaskProgress[]> {
    const progress = await this.prisma.userProgress.findMany({
      where: {
        userId: getLessonProgressData.userId,
        task: { lesson: { slug: getLessonProgressData.lessonSlug } },
      },
      include: { answer: true },
    });

    const tasksProgress: TaskProgress[] = this.generateTaskProgress(progress);
    return tasksProgress;
  }

  async createUserProgress(
    createProgressData: CreateProgressData,
  ): Promise<TaskProgress[]> {
    const progress = await this.prisma.userProgress.create({
      data: createProgressData,
      include: { answer: true },
    });
    return this.generateTaskProgress(progress);
  }

  async updateUserProgress(
    updateProgressData: UpdateProgressData,
  ): Promise<TaskProgress[]> {
    const progress = await this.prisma.userProgress.update({
      where: {
        taskId_userId: {
          taskId: updateProgressData.taskId,
          userId: updateProgressData.userId,
        },
      },
      data: { answerId: updateProgressData.answerId },
      include: { answer: true },
    });
    return this.generateTaskProgress(progress);
  }

  async deleteLessonProgress(
    deleteLessonProgressData: DeleteLessonProgressData,
  ): Promise<{ count: number }> {
    const { count } = await this.prisma.userProgress.deleteMany({
      where: {
        userId: deleteLessonProgressData.userId,
        task: { lessonId: deleteLessonProgressData.lessonId },
      },
    });
    return { count };
  }
}
