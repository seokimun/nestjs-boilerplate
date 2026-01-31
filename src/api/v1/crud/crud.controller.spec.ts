import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

const mockCrudService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('CrudController', () => {
  let crudController: CrudController;
  let crudService: CrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudController],
      providers: [
        {
          provide: CrudService,
          useValue: mockCrudService,
        },
      ],
    }).compile();
    crudController = module.get<CrudController>(CrudController);
    crudService = module.get<CrudService>(CrudService);
  });

  it('should be defined', () => {
    expect(crudController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all crud', async () => {
      const crud = [
        {
          id: '11111111-1111-1111-1111-111111111111',
          testField1: 'a',
          testField2: 1,
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          testField1: 'b',
          testField2: 2,
        },
      ];

      mockCrudService.findAll.mockResolvedValue(crud);

      const result = await crudController.findAll();

      expect(crudService.findAll).toHaveBeenCalled();
      expect(result).toEqual(crud);
    });
  });

  describe('findOne', () => {
    it('should return a crud by id', async () => {
      const crud = {
        id: '11111111-1111-1111-1111-111111111111',
        testField1: 'a',
        testField2: 1,
      };

      mockCrudService.findOne.mockResolvedValue(crud);

      const result = await crudController.findOne(
        '11111111-1111-1111-1111-111111111111',
      );

      expect(crudService.findOne).toHaveBeenCalledWith(
        '11111111-1111-1111-1111-111111111111',
      );
      expect(result).toEqual(crud);
    });
  });

  describe('create', () => {
    it('should create crud', async () => {
      const dto = {
        testField1: 'a',
        testField2: 1,
      };

      const crud = {
        id: '11111111-1111-1111-1111-111111111111',
        ...dto,
      };

      mockCrudService.create.mockResolvedValue(crud);

      const result = await crudController.create(dto);

      expect(crudService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(crud);
    });
  });

  describe('update', () => {
    it('should update crud', async () => {
      const id = '11111111-1111-1111-1111-111111111111';
      const dto = { testField1: 'b' };
      const crud = { id, ...dto };

      mockCrudService.update.mockResolvedValue(crud);

      const result = await crudController.update(id, dto);

      expect(crudService.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual(crud);
    });
  });

  describe('delete', () => {
    it('should delete crud', async () => {
      const id = '11111111-1111-1111-1111-111111111111';

      mockCrudService.delete.mockResolvedValue({ id });

      const result = await crudController.delete(id);

      expect(crudService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id });
    });
  });
});
