import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';
import type { TokenPayload } from 'src/domains/auth/types/authTypes';
import {
  AdminOnly,
  AuthOnly,
} from 'src/domains/auth/decorators/auth.decorators';
import { CreateLessonDto, LessonDto, UpdateLessonDto } from './lesson.dto';
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
  @ApiOkResponse({ type: [LessonDto] })
  @Get('/:lessonSlug')
  async getLessonWithTasks(
    @Param('lessonSlug') lessonSlug: string,
    @CurrentUser() user: TokenPayload,
  ) {
    const lesson = await this.lessonService.getLessonWithTasksBySlug(
      lessonSlug,
      user.id,
    );
    return { lesson };
  }

  @ApiOperation({
    summary: 'Create lesson (AdminOnly)',
    description: 'Return lesson object',
  })
  @ApiBody({ type: CreateLessonDto })
  @ApiOkResponse({ type: LessonDto })
  @AdminOnly()
  @Post('/')
  async createLesson(@Body() data: CreateLessonDto) {
    const lesson = await this.lessonService.createLesson(data);
    return lesson;
  }

  @ApiOperation({
    summary: 'Update lesson (AdminOnly)',
    description: 'Return lesson object',
  })
  @ApiBody({ type: UpdateLessonDto })
  @ApiParam({ name: 'lessonId', type: Number })
  @ApiOkResponse({ type: LessonDto })
  @Patch('/:lessonId')
  async updateLesson(
    @Body() data: UpdateLessonDto,
    @Param('lessonId', ParseIntPipe) lessonId: number,
  ) {
    const lesson = await this.lessonService.updateLesson(data, lessonId);
    return lesson;
  }

  @ApiOperation({
    summary: 'Delete lesson (AdminOnly)',
    description: 'Return lesson object',
  })
  @ApiParam({ name: 'lessonId', type: Number })
  @ApiOkResponse({ type: LessonDto })
  @Delete('/:lessonId')
  async deleteLesson(@Param('lessonId', ParseIntPipe) lessonId: number) {
    const lesson = await this.lessonService.deleteLesson(lessonId);
    return lesson;
  }
}
