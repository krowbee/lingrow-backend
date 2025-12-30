import { Injectable } from '@nestjs/common';
import PrismaService from 'src/lib/prisma/prisma.service';
import { Lesson, Prisma } from '@prisma/client';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async getLesson(
    lessonWhereUniqueInput: Prisma.LessonWhereUniqueInput,
  ): Promise<Lesson | null> {
    return this.prisma.lesson.findUnique({
      where: lessonWhereUniqueInput,
      include: { tasks: { include: { answers: true } } },
    });
  }

  async getLessons(
    lessonWhereInput?: Prisma.LessonWhereInput,
  ): Promise<Lesson[]> {
    return this.prisma.lesson.findMany({
      where: lessonWhereInput || undefined,
      orderBy: { order: 'asc' },
    });
  }

  async createLesson(
    lessonCreateInput: Prisma.LessonCreateInput,
  ): Promise<Lesson> {
    return this.prisma.lesson.create({ data: lessonCreateInput });
  }

  async updateLesson(
    lessonWhereUniqueInput: Prisma.LessonWhereUniqueInput,
    lessonUpdateInput: Prisma.LessonUpdateInput,
  ): Promise<Lesson> {
    return this.prisma.lesson.update({
      where: lessonWhereUniqueInput,
      data: lessonUpdateInput,
    });
  }

  async deleteLesson(
    lessonWhereUniqueInput: Prisma.LessonWhereUniqueInput,
  ): Promise<Lesson> {
    return this.prisma.lesson.delete({ where: lessonWhereUniqueInput });
  }
}
