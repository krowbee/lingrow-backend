import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { plainToInstance } from 'class-transformer';
import { LessonService } from '../lesson/lesson.service';
import { CourseDto } from './course.dto';
import { LessonDto } from '../lesson/lesson.dto';

@Injectable()
export class CourseLogicService {
  constructor(
    private courseService: CourseService,
    private lessonService: LessonService,
  ) {}

  async getCoursesList(): Promise<CourseDto[]> {
    const courses = await this.courseService.getCourses();
    return courses.map((course) => {
      return plainToInstance(CourseDto, course, {
        excludeExtraneousValues: true,
      });
    });
  }

  async getLessonsByCourseSlug(courseSlug: string): Promise<LessonDto[]> {
    const lessons = await this.lessonService.getLessons({
      course: { slug: courseSlug },
    });
    if (!lessons.length) throw new NotFoundException("Incorrect course's slug");
    return lessons.map((lesson) =>
      plainToInstance(LessonDto, lesson, { excludeExtraneousValues: true }),
    );
  }
}
