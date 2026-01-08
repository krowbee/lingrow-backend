import { Controller, Get, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthOnly } from 'src/domains/auth/decorators/auth.decorators';
@ApiTags('Lesson API')
@Controller('lessons')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @ApiOperation({
    summary: 'Get lesson by slug',
    description: "Returns lesson object by lesson's slug",
  })
  @ApiParam({ name: 'lessonSlug', type: String, description: "Lesson's slug" })
  @AuthOnly()
  @Get('/:lessonSlug')
  async getLessonWithTasks(@Param('lessonSlug') lessonSlug: string) {
    const lesson =
      await this.lessonService.getLessonWithTasksBySlug(lessonSlug);
    return { lesson };
  }
}
