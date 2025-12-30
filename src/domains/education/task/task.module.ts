import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { TaskService } from './task.service';

@Module({
  imports: [PrismaModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
