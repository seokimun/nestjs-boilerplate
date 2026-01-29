import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { CrudService } from './crud.service';

const prismaMock = {
  crud: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CrudService', () => {
  let crudService: CrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CrudService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    crudService = module.get<CrudService>(CrudService);
  });

  it('should be defined', () => {
    expect(crudService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all crud', async () => {
      const crud = [
        {
          id: '11111111-1111-1111-1111-111111111112',
          testField1: 'a',
          testField2: 1,
        },
        {
          id: '22222222-2222-2222-2222-222222222222',
          testField1: 'b',
          testField2: 2,
        },
      ];

      prismaMock.crud.findMany.mockResolvedValue(crud);

      const result = await crudService.findAll();

      expect(result).toEqual(crud);
      expect(prismaMock.crud.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });
    });
  });
});
