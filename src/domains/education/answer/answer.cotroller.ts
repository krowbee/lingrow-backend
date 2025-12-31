import { Controller, Param, Post } from '@nestjs/common';
import { AnswerLogicService } from './answer.logic.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Answers API')
@Controller('answer')
export class AnswerController {
  constructor(private answerLogicService: AnswerLogicService) {}
  @ApiOperation({ summary: 'Check is answer correct' })
  @ApiParam({ name: 'taskId', type: Number, description: 'Task id' })
  @ApiParam({ name: 'answerId', type: Number, description: 'Answer id' })
  @Post('/:taskId/:answerId/check')
  async checkAnswer(
    @Param('answerId') answerId: number,
    @Param('taskId') taskId: number,
  ): Promise<{ isCorrect: boolean }> {
    return this.answerLogicService.checkAnswer(answerId, taskId);
  }
}
