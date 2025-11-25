import { Injectable } from '@nestjs/common';
import { AnswerService } from './answer.service';

@Injectable()
export class AnswerLogicService {
  constructor(private answerService: AnswerService) {}
}
