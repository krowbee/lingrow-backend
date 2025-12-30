import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { CourseController } from './course.controller';
import { CourseLogicService } from './course.logic.service';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [PrismaModule, LessonModule],
  providers: [CourseService, CourseLogicService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
