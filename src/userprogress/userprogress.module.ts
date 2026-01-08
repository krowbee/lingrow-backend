import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { UserProgressService } from './userprogress.service';
import { UserProgressController } from './userprogress.controller';

@Module({
  imports: [PrismaModule],
  providers: [UserProgressService],
  exports: [UserProgressService],
  controllers: [UserProgressController],
})
export class UserProgressModule {}
