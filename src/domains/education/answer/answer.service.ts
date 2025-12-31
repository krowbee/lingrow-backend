import { BadRequestException, Injectable } from '@nestjs/common';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private prisma: PrismaService) {}

  async checkAnswer(
    answerId: number,
    taskId: number,
  ): Promise<{ isCorrect: boolean }> {
    const answer = await this.prisma.answer.findUnique({
      where: { id: answerId, taskId: taskId },
      select: { isCorrect: true },
    });

    if (!answer) throw new BadRequestException('Incorrect answer data');
    return { isCorrect: answer.isCorrect };
  }
}
