import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateCourseDto } from './course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({
    summary: 'Get list of courses',
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

  @ApiOperation({
    summary: 'Create course (AdminOnly)',
    description: 'Return course object',
  })
  @ApiBody({ type: CreateCourseDto })
  @Post('/')
  async createCourse(@Body() data: CreateCourseDto) {
    const course = await this.courseService.createCourse(data);
    return course;
  }
}
