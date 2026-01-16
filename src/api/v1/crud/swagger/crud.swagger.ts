import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateCrudBodyDto, UpdateCrudBodyDto } from './crud.swagger-dto';
import { CrudSwaggerEntity } from './crud.swagger-entity';

export const CrudSwagger = {
  Controller: () => applyDecorators(),

  FindAll: () =>
    applyDecorators(
      ApiBearerAuth('Bearer-token'),
      ApiOperation({ summary: 'CRUD 전체조회' }),
      ApiResponse({
        status: 200,
        type: CrudSwaggerEntity,
        isArray: true,
      }),
    ),

  FindOne: () =>
    applyDecorators(
      ApiBearerAuth('Bearer-token'),
      ApiOperation({ summary: 'CRUD 단일조회' }),
      ApiParam({ name: 'id', description: 'CRUD ID' }),
      ApiResponse({
        status: 200,
        type: CrudSwaggerEntity,
      }),
      ApiNotFoundResponse({
        description: 'Crud not found',
      }),
    ),

  Create: () =>
    applyDecorators(
      ApiBearerAuth('Bearer-token'),
      ApiOperation({ summary: 'CRUD 생성' }),
      ApiBody({ type: CreateCrudBodyDto }),
      ApiResponse({
        status: 201,
        type: CrudSwaggerEntity,
      }),
      ApiBadRequestResponse({
        description: 'Validation failed',
      }),
    ),

  Update: () =>
    applyDecorators(
      ApiBearerAuth('Bearer-token'),
      ApiOperation({ summary: 'CRUD 수정' }),
      ApiBody({ type: UpdateCrudBodyDto }),
      ApiResponse({
        status: 200,
        type: CrudSwaggerEntity,
      }),
      ApiBadRequestResponse({
        description: 'Validation failed',
      }),
      ApiNotFoundResponse({
        description: 'Crud not found',
      }),
    ),

  Delete: () =>
    applyDecorators(
      ApiBearerAuth('Bearer-token'),
      ApiOperation({ summary: 'CRUD 삭제' }),
      ApiResponse({
        status: 200,
        type: CrudSwaggerEntity,
      }),
      ApiNotFoundResponse({
        description: 'Crud not found',
      }),
    ),
} as const;
