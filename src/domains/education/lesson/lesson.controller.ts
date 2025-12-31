import { Controller, Get, Param } from '@nestjs/common';
import { LessonLogicService } from './lesson.logic.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@ApiTags('Lesson API')
@Controller('lessons')
export class LessonController {
  constructor(private lessonLogicService: LessonLogicService) {}

  @ApiOperation({
    summary: 'Get lesson by slug',
    description: "Returns lesson object by lesson's slug",
  })
  @ApiParam({ name: 'lessonSlug', type: String, description: "Lesson's slug" })
  @Get('/:lessonSlug')
  async getLessonWithTasks(@Param('lessonSlug') lessonSlug: string) {
    const lesson =
      await this.lessonLogicService.getLessonWithTasksBySlug(lessonSlug);
    return { lesson };
  }
}
