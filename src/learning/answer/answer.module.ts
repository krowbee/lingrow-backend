import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { PrismaModule } from 'src/prisma.module';
import { AnswerLogicService } from './answer.logic.service';
import { AnswerController } from './answer.cotroller';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService, AnswerLogicService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
