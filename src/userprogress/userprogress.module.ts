import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/lib/prisma/prisma.module';
import { UserProgressService } from './userprogress.service';

@Module({
  imports: [PrismaModule],
  providers: [UserProgressService],
  exports: [UserProgressService],
})
export class UserprogressModule {}
