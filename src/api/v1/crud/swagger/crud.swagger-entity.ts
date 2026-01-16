import { ApiProperty } from '@nestjs/swagger';

export class CrudSwaggerEntity {
  @ApiProperty({ example: 'b3b7b7f5-2a86-4c4e-9f2a-2c0d2d8d3a5e' })
  id: string;

  @ApiProperty({ example: 'hello' })
  testField1: string;

  @ApiProperty({ example: 123 })
  testField2: number;

  @ApiProperty({ example: '2026-01-12T15:24:28.517Z' })
  createdAt: string;

  @ApiProperty({ example: '2026-01-12T15:24:28.517Z' })
  updatedAt: string;
}
