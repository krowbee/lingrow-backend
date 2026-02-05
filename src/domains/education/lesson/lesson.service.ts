import { ForbiddenException, Injectable } from '@nestjs/common';
import { toDto } from 'src/lib/transform';
import { LessonDto } from './lesson.dto';
import PrismaService from 'src/lib/prisma/prisma.service';
import { Lesson, Prisma } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getLessonWithTasksBySlug(
    lessonSlug: string,
    userId: number,
  ): Promise<LessonDto> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { slug: lessonSlug },
      include: {
        tasks: {
          include: {
            answers: true,
            progress: { where: { userId }, select: { id: true } },
          },
        },
      },
    });
    if (!lesson) throw new ForbiddenException("Incorrect lesson's slug");
    const lessonWithProgress = {
      ...lesson,
      tasks: lesson.tasks.map((task) => ({
        ...task,
        isCompleted: task.progress.length > 0,
      })),
    };
    return toDto(LessonDto, lessonWithProgress);
  }

  async getLessons(
    lessonWhereInput?: Prisma.LessonWhereInput,
  ): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      where: lessonWhereInput || undefined,
      orderBy: { order: 'asc' },
    });
  }
}
