import { Controller, Get, Param } from '@nestjs/common';
import { CourseLogicService } from './course.logic.service';

@Controller('course')
export class CourseController {
  constructor(private courseLogicService: CourseLogicService) {}

  @Get('/')
  async getCoursesList() {
    const courses = await this.courseLogicService.getCoursesList();
    return { courses };
  }

  @Get('/:courseSlug/lessons')
  async getLesson(@Param('courseSlug') slug: string) {
    const lessons = await this.courseLogicService.getLessonsByCourseSlug(slug);
    return { lessons };
  }
}
