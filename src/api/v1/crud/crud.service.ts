import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { CreateCrudDto } from './schema/create-crud.schema';
import { UpdateCrudDto } from './schema/update-crud.schema';
import ApiError from '../../../libs/errors/api.error';

@Injectable()
export class CrudService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.crud.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const crud = await this.prisma.crud.findUnique({ where: { id } });

    if (!crud) {
      throw ApiError.NotFound(
        '해당 CRUD를 찾을 수 없습니다.',
        'CRUD_NOT_FOUND',
      );
    }

    return crud;
  }

  async create(data: CreateCrudDto) {
    return this.prisma.crud.create({ data });
  }

  async update(id: string, data: UpdateCrudDto) {
    const crud = await this.prisma.crud.findUnique({ where: { id } });

    if (!crud) {
      throw ApiError.NotFound(
        '해당 CRUD를 찾을 수 없습니다.',
        'CRUD_NOT_FOUND',
      );
    }

    return this.prisma.crud.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const crud = await this.prisma.crud.findUnique({ where: { id } });

    if (!crud) {
      throw ApiError.NotFound(
        '해당 CRUD를 찾을 수 없습니다.',
        'CRUD_NOT_FOUND',
      );
    }

    return this.prisma.crud.delete({ where: { id } });
  }
}
