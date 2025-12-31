import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.cotroller';

@Module({
  imports: [PrismaModule],
  providers: [AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})
export class AnswerModule {}
