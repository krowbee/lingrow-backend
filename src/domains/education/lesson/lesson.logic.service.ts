import { ForbiddenException, Injectable } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { plainToInstance } from 'class-transformer';
import { LessonDto } from './lesson.dto';

@Injectable()
export class LessonLogicService {
  constructor(private lessonService: LessonService) {}

  async getLessonWithTasksBySlug(lessonSlug: string): Promise<LessonDto> {
    const lesson = await this.lessonService.getLesson({ slug: lessonSlug });
    if (!lesson) new ForbiddenException("Incorrect lesson's slug");
    return plainToInstance(LessonDto, lesson, {
      excludeExtraneousValues: true,
    });
  }
}
