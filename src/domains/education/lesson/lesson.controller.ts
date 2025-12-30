import { Controller, Get, Param } from '@nestjs/common';
import { LessonLogicService } from './lesson.logic.service';

@Controller('lessons')
export class LessonController {
  constructor(private lessonLogicService: LessonLogicService) {}

  @Get('/:lessonSlug')
  async getLessonWithTasks(@Param('lessonSlug') lessonSlug: string) {
    const lesson =
      await this.lessonLogicService.getLessonWithTasksBySlug(lessonSlug);
    return { lesson };
  }
}
