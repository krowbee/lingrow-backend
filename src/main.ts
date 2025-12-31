import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* API MAP with Swagger */
  const config = new DocumentBuilder()
    .setTitle('Lingrow')
    .setDescription('Lingrow API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(cookieParser());
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server works on: 127.0.0.1:3000`);
}
bootstrap();
