import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './task.dto';
import { toDto } from 'src/lib/transform';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task | null> {
    return this.prisma.task.findUnique({
      where: taskWhereUniqueInput,
      include: { answers: true },
    });
  }

  async getTasks(taskWhereInput: Prisma.TaskWhereInput): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: taskWhereInput || undefined,
      include: { answers: true },
    });
  }

  async saveTask(data: CreateTaskDto | UpdateTaskDto, taskId?: number) {
    try {
      const task = await this.prisma.$transaction(async (tx) => {
        if (taskId) {
          const incomingAnswerIds = data.answers
            ?.filter((ans) => ans.id)
            .map((ans) => ans.id);
          await tx.answer.deleteMany({
            where: { taskId, id: { notIn: incomingAnswerIds } },
          });
        }
        return await tx.task.upsert({
          where: { id: taskId || 0 },
          update: {
            question: data.question,
            soundUrl: data.soundUrl,
            order: data.order,
            answers: {
              upsert: data.answers?.map((ans) => ({
                where: { id: ans.id || 0 },
                update: { text: ans.text, isCorrect: ans.isCorrect },
                create: { text: ans.text, isCorrect: ans.isCorrect },
              })),
            },
          },
          create: {
            question: data.question!,
            soundUrl: data.soundUrl,
            order: data.order!,
            lessonId: (data as CreateTaskDto).lessonId,
            answers: {
              create:
                data.answers?.map((ans) => ({
                  text: ans.text,
                  isCorrect: ans.isCorrect,
                })) || [],
            },
          },
        });
      });
      return toDto(TaskDto, task);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        switch (err.code) {
          case 'P2025':
            throw new NotFoundException('Запис не знайдено');
          case 'P2002':
            throw new ConflictException(
              'Такий запис уже існує (дублікат унікального поля',
            );
          case 'P2003':
            throw new ForbiddenException(
              "Помилка зв'язку: вказаний урок або ID не існує",
            );
        }
      }
      throw new InternalServerErrorException('Виникла невідома помилка');
    }
  }

  async deleteTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task> {
    return this.prisma.task.delete({ where: taskWhereUniqueInput });
  }
}
