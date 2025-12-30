import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { TopicService } from './topic.service';

@Module({
  imports: [PrismaModule],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
