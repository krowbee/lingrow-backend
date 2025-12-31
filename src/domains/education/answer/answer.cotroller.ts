import { Controller, Param, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Answers API')
@Controller('answer')
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @ApiOperation({
    summary: 'Check is answer correct',
    description: 'Returns true if answer correct, or false if not',
  })
  @ApiParam({ name: 'taskId', type: Number, description: 'Task id' })
  @ApiParam({ name: 'answerId', type: Number, description: 'Answer id' })
  @Post('/:taskId/:answerId/check')
  async checkAnswer(
    @Param('answerId') answerId: number,
    @Param('taskId') taskId: number,
  ): Promise<{ isCorrect: boolean }> {
    return this.answerService.checkAnswer(answerId, taskId);
  }
}
