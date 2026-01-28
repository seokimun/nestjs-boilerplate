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
  let service: CrudService;

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

    service = module.get<CrudService>(CrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
