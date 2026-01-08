import { Test, TestingModule } from '@nestjs/testing';
import { UserprogressController } from './userprogress.controller';

describe('UserprogressController', () => {
  let controller: UserprogressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserprogressController],
    }).compile();

    controller = module.get<UserprogressController>(UserprogressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
