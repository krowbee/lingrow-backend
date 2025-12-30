import { Injectable } from '@nestjs/common';
import { Answer, Prisma } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async getAnswer(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
  ): Promise<Answer | null> {
    return this.prisma.answer.findUnique({ where: answerWhereUniqueInput });
  }

  async getAnswers(
    answerWhereInput: Prisma.AnswerWhereInput,
  ): Promise<Answer[]> {
    return this.prisma.answer.findMany({
      where: answerWhereInput || undefined,
    });
  }

  async createAnswer(
    answerCreateInput: Prisma.AnswerCreateInput,
  ): Promise<Answer> {
    return this.prisma.answer.create({ data: answerCreateInput });
  }

  async updateAnswer(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
    answerUpdateInput: Prisma.AnswerUpdateInput,
  ): Promise<Answer> {
    return this.prisma.answer.update({
      where: answerWhereUniqueInput,
      data: answerUpdateInput,
    });
  }

  async deleteAnswer(
    answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
  ): Promise<Answer> {
    return this.prisma.answer.delete({ where: answerWhereUniqueInput });
  }
}
