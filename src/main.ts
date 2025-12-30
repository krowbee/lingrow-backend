import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server works on: 127.0.0.1:3000`);
}
bootstrap();
