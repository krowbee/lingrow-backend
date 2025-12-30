import { Module } from '@nestjs/common';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { AnswerModule } from './answer/answer.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [CourseModule, LessonModule, AnswerModule, TaskModule],
  exports: [CourseModule, LessonModule, AnswerModule, TaskModule],
})
export class EducationModule {}
