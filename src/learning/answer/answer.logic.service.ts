import { BadRequestException, Injectable } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Injectable()
export class AnswerLogicService {
  constructor(private answerService: AnswerService) {}

  async checkAnswer(
    answerId: number,
    taskId: number,
  ): Promise<{ isCorrect: boolean }> {
    const answer = await this.answerService.getAnswer({
      id: answerId,
      taskId: taskId,
    });
    if (!answer) throw new BadRequestException('Incorrect answer data');
    return { isCorrect: answer.isCorrect };
  }
}
