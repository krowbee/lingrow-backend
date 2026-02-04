import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';

import { UserProgressService } from './userprogress.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthOnly } from 'src/domains/auth/decorators/auth.decorators';
import type { TokenPayload } from 'src/domains/auth/types/authTypes';
import {
  CreateProgressDto,
  LessonProgress,
  TaskProgress,
  UpdateProgressDto,
} from './userprogress.dto';

@Controller('progress')
export class UserProgressController {
  constructor(private userProgressService: UserProgressService) {}

  @ApiOperation({
    summary: 'Get list of lessons progress by course slug (AuthOnly)',
    description: 'Returns list of lessons progress',
  })
  @ApiResponse({ status: 200, type: [LessonProgress] })
  @ApiParam({ name: 'courseSlug', type: String, description: "Course's slug" })
  @AuthOnly()
  @Get('/course/:courseSlug')
  async getUserCourseProgress(
    @Param('courseSlug') courseSlug: string,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.userProgressService.getCourseProgress({
      userId: user.id,
      courseSlug,
    });
  }

  @ApiOperation({
    summary: 'Get lesson progress by lesson id (AuthOnly)',
    description: "Returns user's lesson progress",
  })
  @ApiResponse({ status: 200, type: [TaskProgress] })
  @ApiParam({ name: 'lessonSlug', type: String, description: "Lesson's slug" })
  @AuthOnly()
  @Get('/lesson/:lessonSlug')
  async getUserLessonProgress(
    @Param('lessonSlug') lessonSlug: string,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.userProgressService.getLessonProgress({
      lessonSlug,
      userId: user.id,
    });
  }

  @ApiOperation({
    summary: 'Create user progress',
    description: 'Creates user progress',
  })
  @ApiResponse({ status: 201, type: [TaskProgress] })
  @AuthOnly()
  @Post('/')
  async createUserProgress(
    @Body() body: CreateProgressDto,
    @CurrentUser() user: TokenPayload,
  ) {
    const data = { userId: user.id, ...body };
    return this.userProgressService.createUserProgress(data);
  }

  @ApiOperation({
    summary: 'Update user progress',
    description: 'Updates user progress',
  })
  @ApiResponse({ status: 200, type: [TaskProgress] })
  @HttpCode(200)
  @AuthOnly()
  @Patch('/:taskId')
  async updateUserProgress(
    @Body() body: UpdateProgressDto,
    @CurrentUser() user: TokenPayload,
    @Param('taskId') taskId: number,
  ) {
    const data = { userId: user.id, taskId: taskId, ...body };
    return this.userProgressService.updateUserProgress(data);
  }
  @ApiOperation({
    summary: "Delete user's lesson progress",
    description: "Deletes user's lesson progress",
  })
  @ApiResponse({ status: 200, type: Number })
  @AuthOnly()
  @HttpCode(200)
  @Delete('/lesson/:lessonId')
  async deleteLessonProgress(
    @Param('lessonId') lessonId: number,
    @CurrentUser() user: TokenPayload,
  ) {
    const data = { userId: user.id, lessonId };
    return this.userProgressService.deleteLessonProgress(data);
  }
}
