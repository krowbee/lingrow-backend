import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { PrismaModule } from 'src/prisma.module';
import { AnswerLogicService } from './answer.logic.service';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService, AnswerLogicService],
  exports: [AnswerService],
})
export class AnswerModule {}
