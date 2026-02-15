import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { toDto } from 'src/lib/transform';
import { CreateLessonDto, LessonDto, UpdateLessonDto } from './lesson.dto';
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
            progress: { where: { userId }, select: { answerId: true } },
          },
        },
      },
    });
    if (!lesson) throw new ForbiddenException("Incorrect lesson's slug");
    const lessonWithProgress = {
      ...lesson,
      tasks: lesson.tasks.map((task) => ({
        ...task,
        choosedAnswer: task.progress?.[0]?.answerId ?? null,
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

  async createLesson(data: CreateLessonDto): Promise<LessonDto> {
    try {
      const lesson = await this.prisma.lesson.create({ data });
      return toDto(LessonDto, lesson);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        const target = (err.meta?.target as string[]) || [];
        throw new ConflictException(
          `Помилка унікальності ${target.join(', ')}`,
        );
      }
      throw new InternalServerErrorException(
        'При створенні уроку винилка невідома помилка',
      );
    }
  }

  async updateLesson(
    data: UpdateLessonDto,
    lessonId: number,
  ): Promise<LessonDto> {
    try {
      const lesson = await this.prisma.lesson.update({
        where: { id: lessonId },
        data,
      });
      return toDto(LessonDto, lesson);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025')
          throw new NotFoundException('Запис не знайдено');
        if (err.code === 'P2002') {
          const target = (err.meta?.target as string[]) || [];
          throw new ConflictException(
            `Помилка унікальності ${target.join(', ')}`,
          );
        }
      }
      throw new InternalServerErrorException(
        'При оновлені уроку винилка невідома помилка',
      );
    }
  }

  async deleteLesson(lessonId: number): Promise<LessonDto> {
    try {
      const lesson = await this.prisma.lesson.delete({
        where: { id: lessonId },
      });
      return toDto(LessonDto, lesson);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException('Запис не знайдено');
      }
      throw new InternalServerErrorException(
        'Виникла помилка при спробі видалення уроку',
      );
    }
  }
}
