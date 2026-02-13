import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { toDto } from 'src/lib/transform';
import { LessonService } from '../lesson/lesson.service';
import { CourseDto, CreateCourseDto } from './course.dto';
import { PublicLessonDto } from '../lesson/lesson.dto';
import PrismaService from 'src/lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(
    private prisma: PrismaService,
    private lessonService: LessonService,
  ) {}

  async getCoursesList(): Promise<CourseDto[]> {
    const courses = await this.prisma.course.findMany();
    return courses.map((course) => {
      return toDto(CourseDto, course);
    });
  }

  async getLessonsByCourseSlug(courseSlug: string): Promise<PublicLessonDto[]> {
    const lessons = await this.lessonService.getLessons({
      course: { slug: courseSlug },
    });
    if (!lessons.length) throw new NotFoundException("Incorrect course's slug");
    return lessons.map((lesson) => toDto(PublicLessonDto, lesson));
  }

  async createCourse(data: CreateCourseDto): Promise<CourseDto> {
    try {
      const course = await this.prisma.course.create({ data });
      return toDto(CourseDto, course);
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        throw new ConflictException('Курс із таким слагом вже існує');
      }

      throw new InternalServerErrorException(
        'Щось пішло не так при створенні курсу',
      );
    }
  }
}
