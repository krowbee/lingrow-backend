import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { AnswerModule } from './answer/answer.module';
import { TaskModule } from './task/task.module';
import { UserProgressModule } from 'src/userprogress/userprogress.module';

@Module({
  imports: [
    CourseModule,
    LessonModule,
    AnswerModule,
    TaskModule,
    UserProgressModule,
  ],
})
export class EducationModule {}
