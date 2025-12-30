import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './domains/auth/auth.module';
import { AppService } from './app.service';
import { EducationModule } from './domains/education/education.module';

@Module({
  imports: [AuthModule, EducationModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
