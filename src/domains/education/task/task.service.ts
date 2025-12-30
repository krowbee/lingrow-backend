import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

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

  async createTask(taskCreateInput: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data: taskCreateInput });
  }

  async updateTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
    taskUpdateInput: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: taskWhereUniqueInput,
      data: taskUpdateInput,
    });
  }

  async deleteTask(
    taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
  ): Promise<Task> {
    return this.prisma.task.delete({ where: taskWhereUniqueInput });
  }
}
