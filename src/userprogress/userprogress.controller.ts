import { Controller, Get, Param } from '@nestjs/common';
import { CurrentUser } from 'src/domains/auth/decorators/current-user.decorator';
import { UserDto } from 'src/domains/auth/types/AuthDto';
import { UserProgressService } from './userprogress.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('progress')
export class UserProgressController {
  constructor(private userProgressService: UserProgressService) {}

  @ApiOperation({
    summary: 'Get list of lessons progress by course slug (AuthOnly)',
    description: 'Returns list of lessons progress',
  })
  @ApiParam({ name: 'courseSlug', type: String, description: "Course's slug" })
  @Get('/course/:courseSlug')
  async getUserCourseProgress(
    @Param('courseSlug') courseSlug: string,
    @CurrentUser() user: UserDto,
  ) {
    return this.userProgressService.getCourseProgress({
      userId: user.id,
      courseSlug,
    });
  }
}
