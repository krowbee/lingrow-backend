import { Controller, Param, Post } from '@nestjs/common';
import { AnswerLogicService } from './answer.logic.service';

@Controller('answer')
export class AnswerController {
  constructor(private answerLogicService: AnswerLogicService) {}

  @Post('/:taskId/:answerId/check')
  async checkAnswer(
    @Param('answerId') answerId: number,
    @Param('taskId') taskId: number,
  ): Promise<{ isCorrect: boolean }> {
    return this.answerLogicService.checkAnswer(answerId, taskId);
  }
}
