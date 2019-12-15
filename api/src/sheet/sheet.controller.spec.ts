import { Test, TestingModule } from '@nestjs/testing';
import { SheetController } from './sheet.controller';

describe('Sheet Controller', () => {
  let controller: SheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheetController],
    }).compile();

    controller = module.get<SheetController>(SheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
