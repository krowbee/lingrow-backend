import { Injectable } from '@nestjs/common';
import { Course, Prisma } from '@prisma/client';
import PrismaService from 'src/lib/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getCourse(
    courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
  ): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: courseWhereUniqueInput,
    });
  }

  async getCourses(
    courseWhereInput?: Prisma.CourseWhereInput,
  ): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: courseWhereInput || undefined,
    });
  }

  async createCourse(
    courseCreateInput: Prisma.CourseCreateInput,
  ): Promise<Course> {
    return this.prisma.course.create({ data: courseCreateInput });
  }

  async updateCourse(
    courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
    courseUpdateInput: Prisma.CourseUpdateInput,
  ): Promise<Course> {
    return this.prisma.course.update({
      where: courseWhereUniqueInput,
      data: courseUpdateInput,
    });
  }

  async deleteCourse(
    courseWhereUniqueInput: Prisma.CourseWhereUniqueInput,
  ): Promise<Course> {
    return this.prisma.course.delete({ where: courseWhereUniqueInput });
  }
}
