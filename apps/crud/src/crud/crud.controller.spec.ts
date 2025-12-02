import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

describe('CrudController', () => {
  let crudController: CrudController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [CrudService],
    }).compile();

    crudController = app.get<CrudController>(CrudController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(crudController.getHello()).toBe('Hello World!');
    });
  });
});
