import { ApiProperty } from '@nestjs/swagger';

export class CreateCrudBodyDto {
  @ApiProperty({ example: 'hello' })
  testField1: string;

  @ApiProperty({ example: 123 })
  testField2: number;
}

export class UpdateCrudBodyDto {
  @ApiProperty({ example: 'hello', required: false })
  testField1?: string;

  @ApiProperty({ example: 123, required: false })
  testField2?: number;
}
