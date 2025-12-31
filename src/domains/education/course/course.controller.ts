import { Controller, Get, Param } from '@nestjs/common';
import { CourseLogicService } from './course.logic.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('course')
export class CourseController {
  constructor(private courseLogicService: CourseLogicService) {}

  @ApiOperation({
    summary: 'Get list of courses',
    description: 'Returns list of courses',
  })
  @Get('/')
  async getCoursesList() {
    const courses = await this.courseLogicService.getCoursesList();
    return { courses };
  }

  @ApiOperation({
    summary: 'Get lessons by course slug',
    description: 'Returns list of lessons of particular course',
  })
  @ApiParam({ name: 'courseSlug', type: String, description: "Course's slug" })
  @Get('/:courseSlug/lessons')
  async getLesson(@Param('courseSlug') slug: string) {
    const lessons = await this.courseLogicService.getLessonsByCourseSlug(slug);
    return { lessons };
  }
}
