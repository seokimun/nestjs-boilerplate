import { NotFoundException } from '@nestjs/common';
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(crudService).toBeDefined();
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

      prismaMock.crud.findMany.mockResolvedValue(crud);

      const result = await crudService.findAll();

      expect(prismaMock.crud.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      });

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

      prismaMock.crud.findUnique.mockResolvedValue(crud);

      const result = await crudService.findOne(
        '11111111-1111-1111-1111-111111111111',
      );

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id: '11111111-1111-1111-1111-111111111111' },
      });

      expect(result).toEqual(crud);
    });

    it('should throw NotFoundException if crud not found', async () => {
      const id = '99999999-9999-9999-9999-999999999999';

      prismaMock.crud.findUnique.mockResolvedValue(null);

      await expect(crudService.findOne(id)).rejects.toThrow(NotFoundException);

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('create', () => {
    it('should create a new crud', async () => {
      const data = {
        testField1: 'a',
        testField2: 1,
      };

      const crud = {
        id: '11111111-1111-1111-1111-111111111111',
        ...data,
      };

      prismaMock.crud.create.mockResolvedValue(crud);

      const result = await crudService.create(data);

      expect(prismaMock.crud.create).toHaveBeenCalledWith({ data });

      expect(result).toEqual(crud);
    });
  });

  describe('update', () => {
    it('should update a crud by id', async () => {
      const id = '11111111-1111-1111-1111-111111111111';

      const data = {
        testField1: 'b',
        testField2: 2,
      };

      const existingCrud = {
        id,
        testField1: 'a',
        testField2: 1,
      };

      const updatedCrud = {
        ...existingCrud,
        ...data,
      };

      prismaMock.crud.findUnique.mockResolvedValue(existingCrud);
      prismaMock.crud.update.mockResolvedValue(updatedCrud);

      const result = await crudService.update(id, data);

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id },
      });

      expect(prismaMock.crud.update).toHaveBeenCalledWith({
        where: { id },
        data,
      });

      expect(result).toEqual(updatedCrud);
    });

    it('should throw NotFoundException if crud not found', async () => {
      const id = '99999999-9999-9999-9999-999999999999';

      const data = {
        testField1: 'b',
        testField2: 2,
      };

      prismaMock.crud.findUnique.mockResolvedValue(null);

      await expect(crudService.update(id, data)).rejects.toThrow(
        NotFoundException,
      );

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id },
      });

      expect(prismaMock.crud.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a crud by id', async () => {
      const crud = {
        id: '11111111-1111-1111-1111-111111111111',
        testField1: 'a',
        testField2: 1,
      };

      prismaMock.crud.findUnique.mockResolvedValue(crud);

      prismaMock.crud.delete.mockResolvedValue(crud);

      const result = await crudService.delete(
        '11111111-1111-1111-1111-111111111111',
      );

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id: '11111111-1111-1111-1111-111111111111' },
      });

      expect(prismaMock.crud.delete).toHaveBeenCalledWith({
        where: { id: '11111111-1111-1111-1111-111111111111' },
      });

      expect(result).toEqual(crud);
    });

    it('should throw NotFoundException if crud not found', async () => {
      const id = '99999999-9999-9999-9999-999999999999';

      prismaMock.crud.findUnique.mockResolvedValue(null);

      await expect(crudService.delete(id)).rejects.toThrow(NotFoundException);

      expect(prismaMock.crud.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
