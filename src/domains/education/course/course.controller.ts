import { Controller, Get, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({
    summary: 'Get list of courses (AuthOnly)',
    description: 'Returns list of courses',
  })
  @Get('/')
  async getCoursesList() {
    const courses = await this.courseService.getCoursesList();
    return { courses };
  }

  @ApiOperation({
    summary: 'Get lessons by course slug (AuthOnly)',
    description: 'Returns list of lessons of particular course',
  })
  @ApiParam({ name: 'courseSlug', type: String, description: "Course's slug" })
  @Get('/:courseSlug/lessons')
  async getLesson(@Param('courseSlug') slug: string) {
    const lessons = await this.courseService.getLessonsByCourseSlug(slug);
    return { lessons };
  }
}
