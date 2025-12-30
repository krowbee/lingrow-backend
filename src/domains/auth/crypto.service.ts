import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 12;

@Injectable()
export class CryptoService {
  async hashValue(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, saltOrRounds);
    return hashedValue;
  }

  async compareValue(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
