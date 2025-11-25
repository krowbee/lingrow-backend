import { Controller } from '@nestjs/common';
import { AnswerLogicService } from './answer.logic.service';

@Controller('answer')
export class AnswerController {
  constructor(private answerLogicService: AnswerLogicService) {}
}
