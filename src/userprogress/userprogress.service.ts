import { Injectable } from '@nestjs/common';
import { Prisma, UserProgress } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class UserProgressService {
  constructor(private prisma: PrismaService) {}

  async getUserProgress(
    userProgressWhereUniqueInput: Prisma.UserProgressWhereUniqueInput,
  ): Promise<UserProgress | null> {
    return this.prisma.userProgress.findUnique({
      where: userProgressWhereUniqueInput,
    });
  }

  async getUserProgresses(
    userProgressWhereInput: Prisma.UserProgressWhereInput,
  ): Promise<UserProgress[]> {
    return this.prisma.userProgress.findMany({
      where: userProgressWhereInput || undefined,
      include: { answer: true },
    });
  }

  async createUserProgress(
    userProgressCreateInput: Prisma.UserProgressCreateInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.create({ data: userProgressCreateInput });
  }

  async updateUserProgress(
    userProgressWhereUniqueInput: Prisma.UserProgressWhereUniqueInput,
    userProgressUpdateInput: Prisma.UserProgressUpdateInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.update({
      where: userProgressWhereUniqueInput,
      data: userProgressUpdateInput,
    });
  }

  async deleteUserProgress(
    userProgressWhereUniqueInput: Prisma.UserProgressWhereUniqueInput,
  ): Promise<UserProgress> {
    return this.prisma.userProgress.delete({
      where: userProgressWhereUniqueInput,
    });
  }
}
