import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class AnswerDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  text: string;

  @Exclude()
  isCorrect: boolean;

  @Expose()
  @IsNumber()
  taskId: number;
}
